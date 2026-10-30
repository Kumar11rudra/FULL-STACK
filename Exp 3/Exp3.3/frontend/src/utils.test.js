import { describe,it,expect } from 'vitest'
import { formatCount,isEditableRole } from './utils'
describe('workspace UI permissions',()=>{
 it('allows editors and admins to create posts',()=>{
  expect(isEditableRole('ADMIN')).toBe(true)
  expect(isEditableRole('EDITOR')).toBe(true)
 })
 it('keeps viewers read-only',()=>expect(isEditableRole('VIEWER')).toBe(false))
 it('normalizes invalid analytics values',()=>{
  expect(formatCount(undefined)).toBe(0)
  expect(formatCount(3)).toBe(3)
 })
})
