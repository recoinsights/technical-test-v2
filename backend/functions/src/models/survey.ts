import {
  getModelForClass,
  modelOptions,
  prop,
  Severity
} from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: Severity.ALLOW }
})
export class Survey {
  @prop({ required: true, type: String })
  public name!: number;

  @prop({ required: false, type: String })
  public description?: string;

  @prop({ required: true, type: String })
  public company!: string;

  @prop({ required: true, type: Date, default: Date.now })
  public createdAt!: Date;

  @prop({ required: false, type: Date })
  public updatedAt?: Date;
}

export const SurveyModel = getModelForClass(Survey);
