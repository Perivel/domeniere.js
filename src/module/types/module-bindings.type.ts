import { ConcreteDependencyToken, BindingFactory } from '@perivel/verdic';

/**
 * ModuleBindings Type
 */

export type ModuleBindings = Map<ConcreteDependencyToken<any>, BindingFactory<any>>;