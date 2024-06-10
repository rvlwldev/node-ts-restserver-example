import { Get, Post, Patch, Put, Delete, BodyParam } from 'routing-controllers';
import { Inject } from 'typedi';

import RestController from './classes/RestController';
import Model from './classes/Model';
import NotNull from './parameters/NotNull';

export { RestController, Model, Get, Post, Patch, Put, Delete, BodyParam, NotNull, Inject };
