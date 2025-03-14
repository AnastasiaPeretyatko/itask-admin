import { TGroup, TGroupCreate } from '@/types/groups'
import { http } from '.'
import { TParams } from '@/store/groups/groups.slice'

export const getGroupNameAndIdRequest = async (search: string) =>
  http.get(`/groups/groups.name`, { params: { search } })


export const postGroupRequest = (data: TGroupCreate) =>
  http.post('/groups', data)

export const getGroupsRequest = (params: TParams) =>
  http.get('/groups', { params })

export const getGroupsIdRequest = () => http.get('/groups/groups.id')

export const getGroupRequest = (id: string) => http.get(`/groups/${id}`)

export const patchGroupRequest = ({ id, data }: {
  id: string
  data: Partial<TGroup>
}) => http.patch(`/groups/${id}`, data)

export const getStudentsByGroupRequest = (id: string) =>
  http.get(`/groups/${id}/students`)