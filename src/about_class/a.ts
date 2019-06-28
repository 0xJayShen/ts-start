export default class A {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  print_name(){
    console.log(this.name)
  }
}