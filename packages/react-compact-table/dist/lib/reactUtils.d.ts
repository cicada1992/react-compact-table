import React from 'react';
export declare function isElementTypeOf<T>(node: React.ReactNode, componentType: React.ComponentType<T>): node is React.ReactElement<any>;
export declare function deepChildrenMap(children: React.ReactNode, mapFunc: (child: React.ReactNode) => React.ReactNode): React.ReactNode;
