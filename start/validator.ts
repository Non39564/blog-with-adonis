import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'The {{ field }} is required',
  'minLength': 'The {{ field }} must have at least {{ min }} length.',
  'confirmed': 'The {{ field }} is not matched with {{ field }}_confirmation.',

  // Error message for the username field
  'database.unique': 'The {{ field }} is already used.',
})
