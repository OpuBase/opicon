type IconNodeEntry = [string, Record<string, string | number>, ...unknown[]];

const hasFillPaint = (tag: string, attrs: Record<string, string | number>): boolean =>
  (tag === 'path' || tag === 'g') && Boolean(attrs.fill) && attrs.fill !== 'none';

const nodeUsesFill = (node: IconNodeEntry): boolean => {
  if (node.length === 3) {
    const [tag, attrs, children] = node;
    if (hasFillPaint(tag, attrs)) return true;
    return (children as IconNodeEntry[]).some(nodeUsesFill);
  }
  const [tag, attrs] = node;
  return hasFillPaint(tag, attrs);
};

export const iconNodeUsesFill = (iconNode: IconNodeEntry[]): boolean => iconNode.some(nodeUsesFill);
