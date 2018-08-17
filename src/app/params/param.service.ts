import { Injectable } from '@angular/core';
import { Param } from './param';
import { Http, Response } from '@angular/http';

@Injectable()
export class ParamService {
    private paramsUrl = '/api/params';

    constructor (private http: Http) {}

    // get("/api/contacts")
    getParam(): Promise<void | Param[]> {
      return this.http.get(this.paramsUrl)
                 .toPromise()
                 .then(response => response.json() as Param[])
                 .catch(this.handleError);
    }

    // post("/api/contacts")
    createParam(newParam: Param): Promise<void | Param> {
      return this.http.post(this.paramsUrl, newParam)
                 .toPromise()
                 .then(response => response.json() as Param)
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    deleteParam(delParamId: String): Promise<void | String> {
      return this.http.delete(this.paramsUrl + '/' + delParamId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateParam(putParam: Param): Promise<void | Param> {
      var putUrl = this.paramsUrl + '/' + putParam._id;
      return this.http.put(putUrl, putParam)
                 .toPromise()
                 .then(response => response.json() as Param)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
