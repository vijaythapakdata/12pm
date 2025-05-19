import * as React from 'react';
// import styles from './Sample.module.scss';
import type { ISampleProps } from './ISampleProps';
import { ISampleState } from './ISampleState';
import { Web } from '@pnp/sp/webs';
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, TextField } from '@fluentui/react';
export default class Sample extends React.Component<ISampleProps,ISampleState> {
  constructor(props:any){
    super(props);
    this.state={
      Name:"",
      Email:"",
      Age:"",
      Salary:"",
      PermanentAddress:""
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
  Address:this.state.PermanentAddress
});
Dialog.alert("Item Created Successfully");
console.log(item);
this.setState({
  Name:"",
  Email:"",
  Age:"",
  Salary:"",
  PermanentAddress:""
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
      PermanentAddress:""})
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
        <br/>
        <PrimaryButton text="Save" onClick={()=>this.createItem()} iconProps={{iconName:"Save"}}/>&nbsp;&nbsp;&nbsp;
        <PrimaryButton text="Cancel" onClick={()=>this.resetForm()} iconProps={{iconName:"cancel"}}/>
      </form>
      </>
    );
  }
}
