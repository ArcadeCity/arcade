import React from 'react'
import { ChannelPreviewScreen } from '@arcadecity/ui/src'

import Highlight, { defaultProps } from 'prism-react-renderer'
import clsx from 'clsx'

const codeLanguage = 'typescript'
const code = `<ChannelPreview
  channel={channel}
  onPress={() => console.log("Pressed channel", channel.id")}
/>`

export default function () {
  return (
    <>
      <ChannelPreviewScreen />
      <Highlight {...defaultProps} code={code} language={codeLanguage}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={clsx(className, 'flex overflow-x-auto pb-6')}
            style={{ ...style, padding: 12, borderRadius: 10 }}>
            <code className='px-4'>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
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
