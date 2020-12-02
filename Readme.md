# GameUtils

A few utilities usefull when writing games in typescript.

## geometry stuff 
  - Vec2: An immutable 2 dimensional vector class with helper for length, angle and basic operations
  - Line: A class representing a line segment (defined by two vectors), support for collision with other line, rect, test if a point is on the line
  - Rect: A Rectangle class, which can be built from multiple criteria such as size, position, center, etc... With support for collision and inclusion

## events
  - IEmitter, IListener: interfaces for a pub-sub system
  - Emitter: general purpose concretion of IEmitter
  - FListener: concretion of IListener to use with callbacks

# state/data
  - LiveData: a wrapper around any value which can send events to listeners when the value changes. Can be used to centralize some value in one place then have multiple component react to value changes
  - AbstractFsm: a base class for a finite state machine, with live check that no illegal transition is happening. Can be used with enums as the states
  - LiveDataFsm: a concrete fsm which wraps the state object in a livedata object which can be subscribed to outside of the fsm
  - ObservableFsm: Variant of the LiveDataFsm where the fsm itself is an event emitter (ie you can subscribe a listener to the fsm's state changes)

# utils
  - assert: throws an exception if passed an expression whic evaluates to false, can be used as a sanoty check
  - sum: sums together all element of an array (works with numbers only)
  - all: return true if all elements in an array are truthy
  - any: return true if at least one element in an array is truthy
  - range: return an array filled with numbers from 0 to i (non-inclusive). This is not base on generators/iterators and will create the whole array eagerly

# others
  - Cooldown: an object which takes track of time elasped between two uses of a feture and allow to rate limit the usage
  - TagManager: an object which helps in managing multiple strings as tags for something else