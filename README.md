# LotWCS
Legends of the Wulin Character Sheet

<p align="center">
    <a href="https://circleci.com/docs/1.0/status-badges/">
        <img src="https://circleci.com/gh/gentilboulet/LotWCS.svg?&style=shield"
             alt="build status">
    </a>
</p>

This app is designed to help players & wulin sage alike to create character sheets for the role-playing game Legends of the Wulin.

Currently, there are no plans to provide a character database to users.
Instead, LotWCS will provide an import/export feature for you to store your characters.

# Technical stuff
Here we will bore you with technical considerations, for developers of LotWCS mainly.

## App Model
This application uses the standard React-Redux pattern.
The whole application relies on a Redux Store to store the character information.
The character evolves from an initial state to the current state through user actions.

The Redux architecture handle state evolutions by applying a list of actions to the current state, returning a new updated state.
The Redux Store handle the dispatching for actions (from user inputs mainly) to the reducers.

The state is used to feed React Components to display the character.
React Components are subdivided by responsibility: container Components are there to link the store to render Components.

## File hierarchy
The src directory is divided by responsibility:

### actions
Here are the action creators, a lot of helper functions present to generate an input to a specific action understandable by the reducers.

### components
__This directory regroups "renderer" components, handling only rendering and catching user inputs. __

Theirs props must provide everything they need to know to do their job.

### constants
Constants definitions, mainly used to specify available action.type value, on which the reducers rely to identify actions.

### containers
__This directory regroups "containers" components and other functions for reading elements from the state. __

Those are obtained by connecting the store and the state to a "renderer" component.
To do so, three steps are taken for each one:
* mapStateToProps: maps the state to the props, by transforming it, by adding information from static data ;
* mapDispatchToProps: maps dispach actions to the props, passing through the props the dispatch+action creator, allowing subsequent "renderer" components to trigger actions.
* mergeProps: merges both previous "sub props" to the one sent to the "renderer component".
Each container component is connected to a renderer component of the same name.

### data
Static data and some data extraction functions.

### reducers
__This directory regroups reducers, performing modifying actions to the state. __

Here are the global reducer, the one plugged to the Redux Store and a lot of sub reducers, handling a specific subset of actions.
One important rule to note is that no action is applied to the state by different reducers.

### types
Typescript types definitions.

## Data flow
The data trickle down from the state to feed the props of the components.

When a container maps the state to the props of a component, it must check which actions are available or not, and it must take prepare the cost of the action by checking for discount.
In the static data, costs are plain numbers.
Conversion is handled by helper functions in the containers/costs.tsx file.
Functions are also provided to check if something is affordable for the character, and checking how eventual cost discounts will be used for the current cost.

To update the store, the dispatch of an action is encapsulated as an anonymous function to be passed to the renderer component through its props.
This function transforms the input into the action with a creator, and dispatch the action directly.
The renderer component will execute this function when the user does something.
For example, to set the character name, this is the function sent to the renderer (to be triggered when the user click to submit a new name) :
```
props = { onSetName: (s: string) => dispatch(headerSetName(s)); }
```
