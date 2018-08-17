import { Component, Input } from '@angular/core';
import { Param } from '../param';
import { ParamService } from '../param.service';

@Component({
  selector: 'param-details',
  templateUrl: './param-details.component.html',
  styleUrls: ['./param-details.component.css']
})

export class ParamDetailsComponent {
  @Input()
  param: Param;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private paramService: ParamService) {}

  createParam(param: Param) {
    this.paramService.createParam(param).then((newParam: Param) => {
      this.createHandler(newParam);
    });
  }

  updateParam(param: Param): void {
    this.paramService.updateParam(param).then((updatedParam: Param) => {
      this.updateHandler(updatedParam);
    });
  }

  deleteParam(ParamId: String): void {
    this.paramService.deleteParam(ParamId).then((deletedParamId: String) => {
      this.deleteHandler(deletedParamId);
    });
  }
}
