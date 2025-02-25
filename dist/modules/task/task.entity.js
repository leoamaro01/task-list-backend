var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
let Task = class Task {
  id;
  text;
  checked = false;
};
__decorate([PrimaryKey({ type: "bigint" })], Task.prototype, "id", void 0);
__decorate([Property({ type: "text" })], Task.prototype, "text", void 0);
__decorate([Property()], Task.prototype, "checked", void 0);
Task = __decorate([Entity()], Task);
export { Task };
