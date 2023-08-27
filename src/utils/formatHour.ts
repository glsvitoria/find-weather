import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function formatHour(date: Date) {
	return format(date, 'HH:mm', {
		locale: ptBR,
	})
}
