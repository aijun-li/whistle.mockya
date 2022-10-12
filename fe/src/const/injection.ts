import { InjectionKey, WritableComputedRef } from 'vue';

const InjectionKeys = {
  menuActiveName: Symbol() as InjectionKey<WritableComputedRef<string>>,
};

export default InjectionKeys;
