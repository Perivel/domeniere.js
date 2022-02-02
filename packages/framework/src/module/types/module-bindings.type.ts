import { ConcreteDependencyToken, BindingFactory } from '@swindle/container';

/**
 * ModuleBindings Type
 */

export type ModuleBindings = Map<ConcreteDependencyToken<any>, BindingFactory<any>>;