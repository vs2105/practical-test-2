export class CustomRegex {
    public static password='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$'
    public static onlyText = '[a-zA-Z]*';
    public static username = '^[a-zA-Z ]*$';
    public static email = '^[a-zA-Z0-9.-]+@[a-zA-Z0-9-.]+\\.[a-zA-Z]{2,100}$';
    public static updateEmail = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,9}))$/';
    public static phonenumber='^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]$'
  }