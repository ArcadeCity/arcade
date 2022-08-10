import React from 'react'
import { ChannelPreviewScreen } from '@arcadecity/ui/src'

import Highlight, { defaultProps } from 'prism-react-renderer'
import clsx from 'clsx'

const codeLanguage = 'jsx'
const code = `<ChannelPreview
  channel={channel}
  onPress={() => console.log("Pressed channel", channel.id")}
/>`

export default function () {
  return (
    <>
      <ChannelPreviewScreen />
      <Highlight {...defaultProps} code={code} language='jsx'>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={clsx(className, 'flex overflow-x-auto p-6')} style={style}>
            <code className='px-4'>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </>
  )
}
