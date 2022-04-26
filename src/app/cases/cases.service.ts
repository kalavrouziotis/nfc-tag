import { Injectable } from "@angular/core";
import { DalService } from "../services/dal.service";

@Injectable({
  providedIn: "root",
})
export class CasesService {
  constructor(private dal: DalService) {}

  public async fetchCases(tagId: string) {
    return await this.dal.get("cases?tagId=" + tagId + "&sortBy=createdAt_asc");
  }

  public async addCase(caseItem) {
    return this.dal.post("cases", caseItem);
  }

  public async deleteCase(tagId: string) {
    return this.dal.patch("cases/" + tagId, { completed: true });
  }
}
