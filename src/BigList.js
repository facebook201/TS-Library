import React from "react";
import { Subject } from "rxjs";
// import { useObservable } from "rxjs-hooks";
// import { map } from "rxjs/operators";

const sub = new Subject();

sub.subscribe({
  next: (v) => console.log('ObserverA: ' +  v)
});

sub.subscribe({
  next: (v) => console.log('ObserverB: ' +  v)
});

sub.next(1);
sub.next(3);


export default function BigList() {
  // const value = useObservable(() => interval(500).pipe(map((val) => val * 3)));

  return (
    <div className="App">
      <h1>Incremental number: {value}</h1>
    </div>
  );
}
  