export function useOrganizationSchema() {
  const site = useSiteConfig()
  const baseUrl = site.url.replace(/\/+$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Benteveo',
    url: `${baseUrl}/`,
    logo: `${baseUrl}/img/logo-benteveo.avif`,
    image: `${baseUrl}/img/logo-benteveo.avif`,
    description: site.description,
    areaServed: 'AR',
    knowsLanguage: ['es'],
    serviceType: [
      'Agencia creativa',
      'Transformación tecnológica',
      'Eventos corporativos'
    ]
  }
}
