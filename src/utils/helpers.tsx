export const camelize = (str: string) => {
    return str.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
        if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

export const flattenRoutes = (children: any) => {
    const allChildren: any[] = [];

    const flatChild = (children: any) => {
        children.forEach((child: any) => {
            if (child.children) {
                flatChild(child.children);
            } else {
                allChildren.push(child);
            }
        });
    };
    flatChild(children);

    return allChildren;
};

export const getFlattenedRoutes = (children: any) => children.reduce(
    (acc: any, val: any) => {
        if (val.children) {
            return {
                ...acc,
                [camelize(val.name)]: flattenRoutes(val.children)
            };
        } else {
            return {
                ...acc,
                unTitled: [...acc.unTitled, val]
            };
        }
    },
    { unTitled: [] }
);