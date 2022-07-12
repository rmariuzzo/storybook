import React, { FC, useContext } from 'react';
import global from 'global';
import { BaseAnnotations } from '@storybook/csf';
import type { ModuleExports } from '@storybook/store';

import { Anchor } from './Anchor';
import { DocsContext } from './DocsContext';

const { document } = global;

type MetaProps = BaseAnnotations & { of?: ModuleExports };

function renderAnchor() {
  const context = useContext(DocsContext);
  const anchorId = context.storyById().id;

  return <Anchor storyId={anchorId} />;
}

/**
 * This component is used to declare component metadata in docs
 * and gets transformed into a default export underneath the hood.
 */
export const Meta: FC<MetaProps> = ({ of }) => {
  let isDocs = true;
  if (document) {
    const params = new URL(document.location).searchParams;
    isDocs = params.get('viewMode') === 'docs';
  }

  const context = useContext(DocsContext);
  if (of) context.setMeta(of);

  return isDocs ? renderAnchor() : null;
};