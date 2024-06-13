# 인트라넷 RestAPI Server 구축

> CUG, CPG, CCG 통합 RestAPI Server 프로젝트입니다.

## 환경설정

> NodeJS 18.20.3 버전이 필요합니다.  
> requires 폴더에 OS환경에 맞게 설치합니다.

### 스크립트

-   start: 빌드된 프로젝트를 실행합니다. .env.production 환경변수를 사용합니다.
-   stop: 실행중인 빌드된 프로젝트를 정지합니다.
-   dev: 현재 개발중인 프로젝트를 실행합니다. .env.development 환경변수를 사용하며, 테스트DB를 사용합니다.
-   dev:local: 현재 개발중인 프로젝트를 실행합니다. .env.localhost 환경변수를 사용하며, localhost DB를 사용합니다.
-   dev:build: 빌드된 프로젝트를 실행합니다. .env.development 환경변수를 사용하며, 테스트DB를 사용합니다.
-   check: eslint를 사용해 코드를 검사합니다. ts권장설정을 사용중 입니다.
-   build: 현재 프로젝트를 빌드합니다.

### .prettierrc

VSCODE 확장 `Prettier - Code formatter` 설정 파일입니다.  
코드 자동완성 시 (문서 서식) 코드 정렬 및 스타일을 맞춰줍니다.

### .eslintrc

코드의 패턴을 검사해줍니다.  
사용되지 않는 변수 선언이나, 특정 함수, 코드 사용 시 경고나 에러를 던져줍니다.  
빌드 시 동작하거나, `npm run check` 명령어로 실행할 수 있습니다.

### tsconfig.json

타입스크립트 설정파일입니다.

## 구조

> 기본적으로 DDD(`Domain-Driven-Design`) 구조를 따릅니다.  
> Controller, Service, Repository가 도메인별 하나의 디렉토리 안에 존재합니다.
> 공통적으로 사용되는 클래스/미들웨어 등은 src에 위치합니다.

#### ex)

```
├─configurations // 설정 모음
│  └─App.ts // 서버 기본 설정
│  └─Environment.ts // 환경 설정
│  └─ .. 기타 등등
├─databases
│  └─exceptions
│  └─CUG.ts  // 데이터베이스 구현체
│  └─Database.ts // 추상클래스
├─decorators
├─domains
│  └─common
│      └─exceptions
│       └─ UnavailableServer.ts
│  ├─ccg //
│  ├─cpg //
│  ├─cug //
│  │  └─users // 유저
│  │      └─exceptions
│  │        └─UserNotFound.ts
│  │        └─InvalidPassword.ts
│  │        └─ .. 기타 등등
│  │      └─UserController.ts
│  │      └─UserService.ts
│  │      └─UserRepository.ts
│  │  └─documents // 문서
│  │  └─departments // 부서
│  ├─ .. 기타 등등
├─middlewares
│  └─CheckAuthentication.ts // 로그인 확인
│  └─CheckAuthorization.ts // 권한 확인
│  └─Cache.ts // 캐시
│  └─ .. 기타 등등
```

## 레이어

### Repository(Database)

> `import repo from '@/databases/CUG';` 로 알맞는 데이터베이스를 불러올 수 있습니다.  
> select, insert 등의 구문에 맞춰 사용할 수 있으며, '' 과 같은 빈 문자열은 `null`로 치환해줍니다.  
> 각 쿼리마다 SQL Injection 등을 방지합니다. (개발중)
>
> 기존의 DB를 사용하기 때문에 다른 ORM라이브러리는 사용할 수 없지만  
> Select 쿼리마다 인터페이스나 타입을 지정하여 클라이언트에게 반환 형식을 강제할 수 있습니다.  
> 또한 인터페이스/타입을 명시함으로써 각 레이어마다 자동완성지원이 가능합니다.

#### ex)

```JS
// SELECT 결과 interface는 SelectResult를 상속받습니다.
// mysql에서 반환 되는 RowDataPacket를 상속하여 컬럼을 자동으로 매칭합니다.
export interface User extends SelectResult {
	jumin_log: string;
	jumin: string;
	name: string;
	id: string;
	email: string;
	my_table: string;
	admin_check: string;
	sosok: string;
	m_code: string;
	pic_exe: string;
	my_sex: string;
	my_tel: string;
	my_j_code: string;
	post_code: string;
	admin_hr_oCode: string;
}

// Query

import repo from '@/databases/CUG';
import Model from '@/decorators/classes/Model';

@Model() // 해당 클래스를 모델로 사용합니다.
export default class UserModel {
    // 위에 명시한 User 인터페이스를 제네릭으로 Promise객체를 반환합니다.
    async findUserWithPassword(id: string, pw: string): Promise<User>
    {
            const SQL = `
            SELECT man.jumin_log     AS jumin_log,
                man.jumin            AS jumin,
                man.name             AS name,
                man.id               AS id,
            // 생략 ...
            WHERE man.id = ?
              AND man.password_log = PASSWORD(?);
            `;

            return repo
                .select<User>(SQL, [id, pw])
                .then((users) => users as User[])
    }
}
```

### Service

> 실제 비즈니스 로직을 처리합니다.

#### ex)

```JS
import { Inject, Service } from 'typedi';
import { User } from './Types';

import UserModel from './UserRepository';

@Service() // 서비스 명시
export default class UserService {
	constructor(@Inject() private model: UserModel) {} // 의존성 주입

	async login(id: string, pw: string): Promise<User> {
        let user = await this.model.findUserWithPassword(id, pw);

        if (user.length !== 1) throw new Exception(HttpStatusCode.InternalServerError, "잘못된 데이터 입니다.");

        user = user[0];
        delete user.jumin;
        delete user.jumin_log;
        delete user.passwd_log;

		return user;
	}
}
```

### Controller

> 클라이언트와 요청과 반환을 처리합니다.

#### ex)

```JS
import 'reflect-metadata'; // 데코레이터 활용

import {
    RestController,
    Post,
    Status,
    Body,
    NotNull,
    Inject
} from '@/decorators';
import { HttpStatusCode } from 'axios';

import UserService from './UserService';

@RestController('/users') // URL : **/users
export default class UserController {
	constructor(@Inject() private userService: UserService) {} // 의존성 주입

	@Post('/login') // POST URL : **/users/login
    @Status(HttpStatusCode.Ok) // 기본 값은 200이지만 상황에 따라 반환 코드값을 지정합니다.
	async login(
		@Body('id') @NotNull('아이디') id: string, // 클라이언트가 요청한 body의 아이디값
		@Body('pw') @NotNull('비밀번호') pw: string  // 클라이언트가 요청한 body의 비밀번호값
	) {
		const user = await this.userService.login(id, pw);
		return { user };
	}
}

```

## 데코레이터(Decorator)

> 클래스, 함수, 프로퍼티 등에 간편하게 전후처리, 또는 특정한 기능을 부여합니다.

-   클래스 데코레이터
    -   `RestController(path: string)`: 해당 클래스를 API 엔드포인트를 정의하는 컨트롤러로 선언합니다.  
        경로(path)는 URL의 가장 앞부분과 일치합니다.
    -   `Service (typedi 데코레이터)`: 서비스 클래스로 선언합니다. 의존성 주입을 가능하게 합니다.
    -   `Model`: 레포지토리 클래스로 선언합니다.  
        _현재는 딱히 의미는 없는데 나중에 공통적으로 특정 기능이 필요하게 될 수도 있어 구현만 해놨습니다._
-   메소드 데코레이터
    -   `Get(path: string)`: 컨트롤러에서 Get 요청으로 선언
    -   `Post(path: string)`: 컨트롤러에서 Post 요청으로 선언
    -   `Patch(path: string)`: 컨트롤러에서 Patch 요청으로 선언
    -   `Put(path: string)`: 컨트롤러에서 Put 요청으로 선언
    -   `Delete(path: string)`: 컨트롤러에서 Delete 요청으로 선언
    -   `Status(code: number)`: 성공 시 반환되는 HTTP 코드
-   파라미터 데코레이터
    -   `Body(key: string)`: 요청된 Body의 특정 값(key)을 가져옵니다.
    -   `NotNull(name: string)`: 필수 요청값으로 명시합니다. `Body`의 옵션으로  
        필수값 처리를 할 수 있지만 에러처리를 위해 따로 구현했습니다.  
        파라미터 `name` 은 입력하지 않았을 때, 클라이언트에게 보여질 이름입니다.  
        예를 들어 '이메일'이라고 지정한다면 400의 에러코드와 "필수 값이 입력되지 않았습니다. (이메일)" 을 반환합니다.
    -   `Inject`: 생성자에서 의존성을 주입합니다.

## 에러 처리

> `_common/exceptions/Exception` 클래스를 상속 받아 구현해놓고 사용 할 수 있습니다.  
> 따로 에러 처리를 하지 않았다면
> 클라이언트에게 해당 에러의 code 값을 HTTP 상태 값으로 전송됩니다.

### ex)

```JS

class InvalidDocument extends Exception {
    constructor (code = 404, message = "해당 문서를 찾을 수 없습니다.") {
        super(code, message);
    }
}

// ...

async getDocuments(...id: string[]): Promise<Document[]> {
    return await this.model.findDocuments(...id).then((docs) => {
        if (docs === null || docs.length < 1) {
            throw new InvalidDocument();

            // 또는
            throw new InvalidDocument(HttpStatusCode.NotFound, "그런 문서 없습니다."); // 메세지 재정의
        }

        return docs;
    })
    .catch((err)=> {
        if (err instanceof Exception) throw err;
        throw err;
    })
}



```

#### 클라이언트 수신 예시

```JSON
// 요청은 올바르지만 삭제 등으로 문서는 없는 경우
{
    "error" : true,
    "status" : 404,
    "message" : "해당 문서를 찾을 수 없습니다."
}

// 등등 ..
```
