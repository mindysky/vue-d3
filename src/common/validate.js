// validate plugin Register it globally
import Vue from "vue";
import { ValidationProvider, extend, ValidationObserver, setInteractionMode } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
setInteractionMode('passive');

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zh_CN.messages[rule] // add its message
  });
}
// custom validate rules & message
extend('required', {
  message: '请输入{_field_}'
});

extend('phone',  value => {
     if(value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)){
       return true
     }
     return '请输入正确的手机号'
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


