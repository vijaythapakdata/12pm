import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'SampleWebPartStrings';
import Sample from './components/Sample';
import { ISampleProps } from './components/ISampleProps';
import {sp} from "@pnp/sp/presets/all";
export interface ISampleWebPartProps {
  ListName: string;
   CityOptions:any;
}

export default class SampleWebPart extends BaseClientSideWebPart<ISampleWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
     sp.setup({
      spfxContext:this.context as any
     });
     this._getLookupValues();
    });
  }

  public async render():Promise<void> {
    const element: React.ReactElement<ISampleProps> = React.createElement(
      Sample,
      {
        ListName: this.properties.ListName,
        siteurl:this.context.pageContext.web.absoluteUrl,
        context:this.context,
        DepartmentOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,this.properties.ListName,'Department'),
         GenderOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,this.properties.ListName,'Gender'),
          SkillsOptions:await this._getChoiceValues(this.context.pageContext.web.absoluteUrl,this.properties.ListName,'Skills'),
           CityOptions:this.properties.CityOptions
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
  //Get Choice Values 
  private async _getChoiceValues(siteurl:string,listName:string,fieldVlue:string):Promise<any>{
    try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${listName}')/fields?$filter=EntityPropertyName eq '${fieldVlue}'`,
{
  method:'GET',
  headers:{
    'Accept':'application/json;odata=nometadata'
  }
}

);
if(!response.ok){
  throw new Error(`Error found ${response.status}`);
}
const data=await response.json();
const choices=data.value[0].Choices;

return choices.map((choice:any)=>({
  key:choice,
  text:choice
}))
    }
    catch(err){
console.error(err);
    }
  }

  //get lookup values
  private async _getLookupValues():Promise<void>{
    try{
      const response =await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Cities')/items?$select=Title,ID`,{
        method:'GET',
        headers:{
          'Accept':'application/json;odata=nometadata'
        }
      });
      if(!response.ok){
        throw new Error(`Error found ${response.status}`);
      }
      const data=await response.json();
      const cityoption=data.value.map((city:{ID:string,Title:string})=>({
        key:city.ID,
        text:city.Title
      }));
      this.properties.CityOptions=cityoption
    }
    catch(err){
      console.error(err);
    }
  }
}
