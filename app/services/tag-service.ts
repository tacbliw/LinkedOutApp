import { useCallback, useEffect, useState } from 'reactn'
import { tagRepository } from '../repositories/tag-repository'

export const tagService = {
  useSkillTag(): [string[], () => void, (value: string) => void] {
    const [skillTag, setSkillTag] = useState<string[]>()

    const [loading, setLoading] = useState<boolean>(false)

    const getAllSkillTag = useCallback(async () => {
      setLoading(true)
      const response = await tagRepository.getSkill('')
      setSkillTag(response.tag)
      setLoading(false)
    }, [])

    const getSkillTagByQuery = useCallback(async (value: string) => {}, [])

    return [skillTag, getAllSkillTag, getSkillTagByQuery]
  },

  useSpecialtyTag(): [string[], () => void, (value: string) => void] {
    const [specialtyTag, setSpecialtyTag] = useState<string[]>()

    const [loading, setLoading] = useState<boolean>(false)

    const getAllSpecialtyTag = useCallback(async () => {
      setLoading(true)
      const response = await tagRepository.getSpecialty('')
      setSpecialtyTag(response.tag)
      setLoading(false)
    }, [])

    const getSpecialtyTagByQuery = useCallback(async (value: string) => {}, [])

    return [specialtyTag, getAllSpecialtyTag, getSpecialtyTagByQuery]
  },

  useLocation(): [string[]] {
    const [locationList, setLocationList] = useState<string[]>([])

    useEffect(() => {
      tagRepository
        .getLocation()
        .then((response) => {
          setLocationList(response.tag)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    return [locationList]
  },
}
