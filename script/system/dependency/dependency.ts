
export enum DependencyLifetime {
    Singleton = 'singleton',
    Transient = 'transient'
}

export interface Constructor<T = any> {
    new(...args: any[]): T;
}

interface DependencyMetadata<T = any> {
    factory: () => T;
    lifetime: DependencyLifetime;
    instance?: T;
}

export class DependencyContainer {
    private static instance: DependencyContainer;
    private dependencies: Map<string, DependencyMetadata> = new Map();

    private constructor() { }

    public static getInstance(): DependencyContainer {
        if (!DependencyContainer.instance) {
            DependencyContainer.instance = new DependencyContainer();
        }
        return DependencyContainer.instance;
    }

    public static reset(): void {
        DependencyContainer.instance = new DependencyContainer();
    }

    public bind<T>(
        key: string,
        classConstructor: Constructor<T>,
        lifetime: DependencyLifetime = DependencyLifetime.Singleton,
        dependencies: string[] = []
    ): this {
        this.dependencies.set(key, {
            factory: () => {
                const deps = dependencies.map(dep => this.resolve(dep));
                return new classConstructor(...deps);
            },
            lifetime,
            instance: undefined
        });
        return this;
    }

    public registerInstance<T>(key: string, instance: T): this {
        this.dependencies.set(key, {
            factory: () => instance,
            lifetime: DependencyLifetime.Singleton,
            instance
        });
        return this;
    }

    public resolve<T>(key: string): T {
        const metadata = this.dependencies.get(key);
        
        if (!metadata) {
            throw new Error(`Dependency "${key}" chưa được đăng ký`);
        }

        if (metadata.lifetime === DependencyLifetime.Singleton && metadata.instance) {
            return metadata.instance as T;
        }

        const instance = metadata.factory();

        if (metadata.lifetime === DependencyLifetime.Singleton) {
            metadata.instance = instance;
        }

        return instance as T;
    }

    public get<T>(key: string): T {
        return this.dependencies.get(key)?.instance as T;
    }

    public has(key: string): boolean {
        return this.dependencies.has(key);
    }

    public remove(key: string): boolean {
        return this.dependencies.delete(key);
    }

    public clear(): void {
        this.dependencies.clear();
    }

    public getRegisteredKeys(): string[] {
        return Array.from(this.dependencies.keys());
    }
}

export function injectable(key?: string) {
    return function <T extends Constructor>(target: T) {
        const metadata = (target as any).__injectable__ = {
            injectable: true,
            key: key
        };
        return target;
    };
}

export function inject(key: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                const container = DependencyContainer.getInstance();
                return container.resolve(key);
            },
            enumerable: true,
            configurable: true
        });
    };
}

export function resolve<T>(key: string): T {
    return DependencyContainer.getInstance().resolve<T>(key);
}