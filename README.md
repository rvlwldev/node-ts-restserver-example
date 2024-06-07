# 인트라넷 RestAPI Server 구축

> CUG, CPG, CCG 통합 RestAPI Server 프로젝트입니다.

## 환경 설정

> NodeJS 18.20.3 버전이 필요합니다.  
> requires 폴더에 OS환경에 맞게 설치합니다.

## 스크립트

-   start: 빌드된 프로젝트를 실행합니다. .env.production 환경변수를 사용합니다.
-   stop: 실행중인 빌드된 프로젝트를 정지합니다.
-   dev: 현재 개발중인 프로젝트를 실행합니다. .env.development 환경변수를 사용하며, 테스트DB를 사용합니다.
-   dev:local: 현재 개발중인 프로젝트를 실행합니다. .env.localhost 환경변수를 사용하며, localhost DB를 사용합니다.
-   check: eslint를 사용해 코드를 검사합니다. ts권장설정을 사용중 입니다.
-   build: 현재 프로젝트를 빌드합니다.

## Database
> 기존의 DB를 사용하기 때문에 다른 ORM라이브러리는 사용할 수 없습니다.
> 