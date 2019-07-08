import React from 'react';

let lastComponentType: React.ComponentType<any> | null = null;
let lastComponentElement: React.ReactElement<any> | null = null;

export function isElementTypeOf<T>(
  node: React.ReactNode,
  componentType: React.ComponentType<T>
): node is React.ReactElement<any> {
  if (!React.isValidElement(node)) {
    return false;
  }
  const element = node as React.ReactElement<any>;
  if (componentType === lastComponentType) {
    return element.type === lastComponentElement.type;
  }
  const componentElement = React.createElement(componentType);
  lastComponentType = componentType;
  lastComponentElement = componentElement;
  return element.type === componentElement.type;
}

export function deepChildrenMap(
  children: React.ReactNode,
  mapFunc: (child: React.ReactNode) => React.ReactNode
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<any>;
      const elementChildren = element.props.children;
      const hasComplexChildren =
        React.Children.count(elementChildren) > 0 && typeof elementChildren === 'object';
      if (hasComplexChildren) {
        const modifiedChildren = deepChildrenMap(elementChildren, mapFunc);
        const modifiedElement = React.cloneElement(element, { children: modifiedChildren });
        return mapFunc(modifiedElement);
      }
    }
    return mapFunc(child);
  });
}
