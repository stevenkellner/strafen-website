export type Result<T, E extends Error> = Result.Success<T> | Result.Failure<E>;

export namespace Result {
    export class Success<T> {

        public readonly state = 'success';

        public constructor(
            public readonly value: T
        ) {}

        public get error(): null {
            return null;
        }

        public get valueOrError(): T {
            return this.value;
        }

        public get(): T {
            return this.value;
        }

        public map<T2>(mapper: (value: T) => T2): Result<T2, never> {
            return new Result.Success<T2>(mapper(this.value));
        }

        public mapError(): Result<T, never> {
            return this;
        }
    }

    export class Failure<E extends Error> {


        public readonly state = 'failure';

        public constructor(
            public readonly error: E
        ) {}

        public get value(): null {
            return null;
        }

        public get valueOrError(): E {
            return this.error;
        }

        public get(): never {
            throw this.error;
        }

        public map(): Result<never, E> {
            return this;
        }

        public mapError<E2 extends Error>(mapper: (value: E) => E2): Result<never, E2> {
            return new Result.Failure<E2>(mapper(this.error));
        }
    }

    export function success<T>(value: T): Result<T, never>;
    export function success(): Result<void, never>;
    export function success<T>(value?: T): Result<T | void, never> {
        return new Result.Success<T | void>(value);
    }

    export function failure<E extends Error>(error: E): Result<never, E> {
        return new Result.Failure<E>(error);
    }

    export function isSuccess<T, E extends Error>(result: Result<T, E>): result is Result.Success<T> {
        return result.state === 'success';
    }

    export function isFailure<T, E extends Error>(result: Result<T, E>): result is Result.Failure<E> {
        return result.state === 'failure';
    }
}
