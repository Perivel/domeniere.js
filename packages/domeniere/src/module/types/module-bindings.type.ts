import { ConcreteDependencyToken, BindingFactory } from 'verdic';

/**
 * ModuleBindings Type
 */

export type ModuleBindings = Map<ConcreteDependencyToken<any>, BindingFactory<any>>;