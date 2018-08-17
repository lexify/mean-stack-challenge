import { Component, OnInit } from '@angular/core';
import { Param } from '../param';
import { ParamService } from '../param.service';
import { ParamDetailsComponent } from '../param-details/param-details.component';

@Component({
  selector: 'param-list',
  templateUrl: './param-list.component.html',
  styleUrls: ['./param-list.component.css'],
  providers: [ParamService]
})

export class ParamListComponent implements OnInit {

  params: Param[]
  selectedParam: Param

  constructor(private paramService: ParamService) { }

  ngOnInit() {
     this.paramService
      .getParam()
      .then((params: Param[]) => {
        this.params = params.map((param) => {
          return param;
        });
      });
  }

  private getIndexOfParam = (paramId: String) => {
    return this.params.findIndex((param) => {
      return param._id === paramId;
    });
  }

  selectParam(param: Param) {
    this.selectedParam = param
  }

  createNewParam() {
    var param: Param = {
      filename: '',
      server: '',
      values: ''
    };

    // By default, a newly-created contact will have the selected state.
    this.selectParam(param);
  }

  deleteParam = (paramId: String) => {
    var idx = this.getIndexOfParam(paramId);
    if (idx !== -1) {
      this.params.splice(idx, 1);
      this.selectParam(null);
    }
    return this.params;
  }

  addParam = (param: Param) => {
    this.params.push(param);
    this.selectParam(param);
    return this.params;
  }

  updateParam = (param: Param) => {
    var idx = this.getIndexOfParam(param._id);
    if (idx !== -1) {
      this.params[idx] = param;
      this.selectParam(param);
    }
    return this.params;
  }
}
