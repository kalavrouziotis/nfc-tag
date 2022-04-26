import { Component, OnInit } from '@angular/core';
import { DalService } from 'src/app/services/dal.service';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.page.html',
  styleUrls: ['./case-view.page.scss'],
})
export class CaseViewPage implements OnInit {

  constructor(
    private dal: DalService
     ) { }

  public ngOnInit() { }

}
