import * as React from 'react';
// import styles from './Sample.module.scss';
import type { ISampleProps } from './ISampleProps';
import { ISampleState } from './ISampleState';
import { Web } from '@pnp/sp/webs';
import { Dialog } from '@microsoft/sp-dialog';
import { ChoiceGroup, Dropdown, PrimaryButton, TextField } from '@fluentui/react';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker";
export default class Sample extends React.Component<ISampleProps,ISampleState> {
  constructor(props:any){
    super(props);
    this.state={
      Name:"",
      Email:"",
      Age:"",
      Salary:"",
      PermanentAddress:"",
      Manager:[],
      MangaerId:[],
      Admin:'',
      AdminId:0,
      Department:"",
      City:"",
      Gender:""
    }
  }
  ////Create item

  private async createItem(){
    try{
const web=Web(this.props.siteurl);
const list=web.lists.getByTitle(this.props.ListName);
//create item
const item=await list.items.add({
  Title:this.state.Name,
  EmailAddress:this.state.Email,
  Age:parseInt(this.state.Age),
  Salary:parseFloat(this.state.Salary),
  Address:this.state.PermanentAddress,
  AdminId:this.state.AdminId,
  ManagerId:{results:this.state.MangaerId},
  Department:this.state.Department,
  Gender:this.state.Gender,
  CityId:this.state.City
});
Dialog.alert("Item Created Successfully");
console.log(item);
this.setState({
  Name:"",
  Email:"",
  Age:"",
  Salary:"",
  PermanentAddress:"",
   Manager:[],
      MangaerId:[],
      Admin:'',
      AdminId:0,
      Department:"",
      City:"",
      Gender:""
})
    }
    catch(err){
console.log(err);
Dialog.alert("Error in creating item");
    }
  }

  // Reset form
  private resetForm(){
    this.setState({
      Name:"",
  Email:"",
  Age:"",
  Salary:"",
  PermanentAddress:"",
   Manager:[],
      MangaerId:[],
      Admin:'',
      AdminId:0,
      Department:"",
      City:"",
      Gender:""
    })
  }
//Form Event
private handleChange=(fieldvalue:keyof ISampleState,value:string|boolean|number):void=>{
  this.setState({[fieldvalue]:value}as unknown as Pick<ISampleState,keyof ISampleState>)
}

  public render(): React.ReactElement<ISampleProps> {
    

    return (
      <>
      <form>
        <TextField label='Name' value={this.state.Name}
        onChange={(_,event)=>this.handleChange("Name",event||"")}
        />
          <TextField label='Email' value={this.state.Email}
        onChange={(_,event)=>this.handleChange("Email",event||"")}
        />
          <TextField label='PermanentAddress' value={this.state.PermanentAddress}
        onChange={(_,event)=>this.handleChange("PermanentAddress",event||"")} multiline
        rows={5}
        />
           <TextField label='Age' value={this.state.Age}
        onChange={(_,event)=>this.handleChange("Age",event||"")}
        />
           <TextField label='Salary' value={this.state.Salary}
        onChange={(_,event)=>this.handleChange("Salary",event||"")}
        prefix='₹' suffix='INR'
        />
        <PeoplePicker
        context={this.props.context as any}
        titleText="Managers"
        personSelectionLimit={3}
        ensureUser={true}
        showtooltip={true}
        required={false}
        onChange={this._getManagers}
        defaultSelectedUsers={this.state.Manager}
resolveDelay={1000}
principalTypes={[PrincipalType.User]}
webAbsoluteUrl={this.props.siteurl}
        />
         <PeoplePicker
        context={this.props.context as any}
        titleText="Admin"
        personSelectionLimit={1}
        ensureUser={true}
        showtooltip={true}
        required={false}
        onChange={this._getAdmin}
        defaultSelectedUsers={[this.state.Admin?this.state.Admin:""]} // ternary operator
resolveDelay={1000}
principalTypes={[PrincipalType.User]}
webAbsoluteUrl={this.props.siteurl}
        />
        <Dropdown
        label='Department'
        placeholder='Select Department'
        options={this.props.DepartmentOptions}
        onChange={(_,option)=>this.handleChange("Department",option?option.key:"")}
        selectedKey={this.state.Department}
        />
          <ChoiceGroup
        label='Gender'
       
        options={this.props.GenderOptions}
        onChange={(_,option)=>this.handleChange("Gender",option?option.key:"")}
        selectedKey={this.state.Gender}
        />
          <Dropdown
        label='City'
        placeholder='Select City'
        options={this.props.CityOptions}
        onChange={(_,option)=>this.handleChange("City",option?option.key:"")}
        selectedKey={this.state.City}
        />
        <br/>
        <PrimaryButton text="Save" onClick={()=>this.createItem()} iconProps={{iconName:"Save"}}/>&nbsp;&nbsp;&nbsp;
        <PrimaryButton text="Cancel" onClick={()=>this.resetForm()} iconProps={{iconName:"cancel"}}/>
      </form>
      </>
    );
  }
  //Manager
  private  _getManagers=(items:any):void=>{
    const managers=items.map((item:any)=>item.text);
    const managerIds=items.map((item:any)=>item.id);
    this.setState({
      Manager:managers,
      MangaerId:managerIds
    });
  }
  //Admin

  private _getAdmin=(items:any):void=>{
    if(items.length>0){
      this.setState({
        Admin:items[0].text,
        AdminId:items[0].id
      });
    }
    else{
      this.setState({
        Admin:"",
        AdminId:0
      });
    }
  }
}
