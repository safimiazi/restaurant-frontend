/* eslint-disable @typescript-eslint/no-explicit-any */

export const sidebarGenerator = (items: any[], role: string) => {
  return items.reduce((acc: any[], item: any) => {
    if (!item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        path: item.path,
        role: role,
        icon: item.icon,

      });
    } else if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        path: item.path,
        role: role,
        icon: item.icon,
        children: sidebarGenerator(item.children, role),
      });
    }

    return acc;
  }, []);
};
