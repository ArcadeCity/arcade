import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useForm } from 'react-hook-form'
import { useStores } from 'stores'
import { ModalName, ModalStatus } from 'stores/modal-store'
import { Button, Screen, Text, TextField } from 'views/shared'
import { spacing } from 'views/theme'

export const AddDetails: React.FC<{}> = () => {
  // State
  const { modalStore, serviceStore } = useStores()
  const activeRequest = serviceStore.activeRequest
  if (!activeRequest) return null
  const details = activeRequest.details ?? ''

  // Form
  const { register, handleSubmit, setValue } = useForm()
  useEffect(() => {
    register('details')
    setValue('details', details)
    setField(details)
  }, [register])

  const [field, setField] = useState('')
  const submit = () => {
    activeRequest.setDetails(field)
    modalStore.setName(ModalName.REQUEST_CONFIRM)
  }

  // UI
  const autoFocus = modalStore.status === ModalStatus.SHOWING

  return (
    <Screen preset='fixedStack'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          paddingHorizontal: 20,
          paddingTop: 32,
          paddingBottom: 30,
          minHeight: 400,
        }}
      >
        <Text
          preset='title2'
          tx='service.addRequestDetails'
          text='Add request details'
          style={{ paddingTop: 10 }}
        />
        <Text
          preset='descriptionSlim'
          tx='service.addRequestDetailsExplainer'
        />
        <TextField
          multiline
          value={field}
          autoFocus={autoFocus}
          onChangeText={(text) => {
            setValue('note', text)
            setField(text)
          }}
          inputStyle={{ height: 90, padding: spacing[3] }}
        />
        <Button
          onPress={handleSubmit(submit)}
          tx='common.saveAndGoBack'
          style={{ marginBottom: 25 }}
        />
      </KeyboardAvoidingView>
    </Screen>
  )
}
