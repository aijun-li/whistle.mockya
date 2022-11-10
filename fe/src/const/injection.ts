import { InjectionKey, Ref, WritableComputedRef } from 'vue';

const InjectionKeys = {
  menuActiveName: Symbol() as InjectionKey<WritableComputedRef<string>>,
  selectValue: Symbol() as InjectionKey<Ref<string>>,
  bottomNavActiveName: Symbol() as InjectionKey<WritableComputedRef<string>>,
  buttonGroupActiveName: Symbol() as InjectionKey<WritableComputedRef<string> | string>,
};

export default InjectionKeys;
