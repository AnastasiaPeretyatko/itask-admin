import { TGroup, TGroupCreate } from '@/types/group'
import { http } from '.'
import { TParams } from '@/store/groups/groups.slice'

export const postGroupRequest = (data: TGroupCreate) =>
  http.post('/groups', data)

export const getGroupRequest = (params: TParams) =>
  http.get('/groups', { params })

export const patchGroupRequest = ({
  id,
  data,
}: {
  id: string
  data: Partial<TGroup>
}) => http.patch(`/groups/${id}`, data)