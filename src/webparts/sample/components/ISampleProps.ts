import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISampleProps {
 ListName:string;
 siteurl:string;
 context :WebPartContext;
 DepartmentOptions:any;
 GenderOptions:any;
 SkillsOptions:any;
 CityOptions:any;
}
// pagecontext, httpclient, sphttpclient,web,user,environment