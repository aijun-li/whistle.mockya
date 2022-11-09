import { InjectionKey, Ref, WritableComputedRef } from 'vue';

const InjectionKeys = {
  menuActiveName: Symbol() as InjectionKey<WritableComputedRef<string>>,
  selectValue: Symbol() as InjectionKey<Ref<string>>,
  bottomNavActiveName: Symbol() as InjectionKey<WritableComputedRef<string>>,
};

export default InjectionKeys;
