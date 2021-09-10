import { TraceInterface } from "./trace.interface";

/**
 * Trace
 * 
 * A class to manage state changes.
 */

export class Trace<T> implements TraceInterface<T> {
  private value: T;
  private candidate: T;
  private hasCandidate: boolean;

  constructor(initialValue: T) {
    this.value = initialValue;
    this.candidate = initialValue;
    this.hasCandidate = false;
  }

  /**
   * confirm()
   *
   * confirms the trace changes.
   */

  public confirm(): void {
    this.value = this.candidate;
    this.hasCandidate = false;
  }

  /**
   * discard()
   *
   * discards the changes
   */

  public discard(): void {
    this.hasCandidate = false;
  }

  /**
   * get()
   *
   * gets the value of the trace.
   */

  public get(): T {
    if (this.hasCandidate) {
      return this.candidate;
    } else {
      return this.value;
    }
  }

  /**
   * set()
   *
   * sets the value of the trace.
   * @param value the value to set.
   */

  public set(value: T): void {
      this.candidate = value;
      this.hasCandidate = true;
  }
}
