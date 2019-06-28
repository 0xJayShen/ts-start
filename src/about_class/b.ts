import A from './a'
export default class B extends A{
  constructor(name:string,age:number){
    super(name,age)
  }
  print_age(){
      console.log(this.age)
  }
}