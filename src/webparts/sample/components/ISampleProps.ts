import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISampleProps {
 ListName:string;
 siteurl:string;
 context :WebPartContext;
}
// pagecontext, httpclient, sphttpclient,web,user,environment