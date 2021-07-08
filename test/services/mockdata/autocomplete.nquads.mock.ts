export const successInitalIncomingAutocomplete = `
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://pid.bayer.com/kos/19014/Person> .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://www.w3.org/2000/01/rdf-schema#label> "Friedrich Bayer" .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://10.122.106.18:3000/firstName> "Friedrich" .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://10.122.106.18:3000/lastName> "Bayer" .
<http://10.122.106.18:3000/Person/erik> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://pid.bayer.com/kos/19014/Person> .
<http://10.122.106.18:3000/Person/erik> <http://www.w3.org/2000/01/rdf-schema#label> "Erik Krummeich" .
<http://10.122.106.18:3000/Person/erik> <http://10.122.106.18:3000/firstName> "Erik" .
`

export const successIncomingAutocomplete = `
<http://10.122.106.18:3000/Person/erik> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://pid.bayer.com/kos/19014/Person> .
<http://10.122.106.18:3000/Person/erik> <http://www.w3.org/2000/01/rdf-schema#label> "Erik Krummeich" .
<http://10.122.106.18:3000/Person/erik> <http://10.122.106.18:3000/firstName> "Erik" .
`

export const successIncomingRandomAutocomplete = `
<http://10.122.106.18:3000/Person/erik> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> "Erik Krummeich" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> "G\u00F6khan Coskun" .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> "Friedrich Bayer" .
`

export const successOutgoingMultipleGroups = `
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://www.w3.org/2000/01/rdf-schema#label> "Friedrich Bayer" .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://pid.bayer.com/kos/19014/Person> .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://10.122.106.18:3000/lastName> "Bayer" .
<http://10.122.106.18:3000/bln_m427> <http://10.122.106.18:3000/hasPicture> "https://transkript.de/fileadmin//transkript/01_Nachrichten/2020/2020_02_11_bayer_berlin.jpg" .
<http://10.122.106.18:3000/bln_m427> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/OfficeBuilding> .
<http://10.122.106.18:3000/companies/Bayer> <http://www.w3.org/2000/01/rdf-schema#label> "Bayer AG" .
<http://10.122.106.18:3000/companies/Bayer> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/Company> .
`

export const successOutgoingOneGroup = `
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://www.w3.org/2000/01/rdf-schema#label> "Friedrich Bayer" .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://pid.bayer.com/kos/19014/Person> .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://10.122.106.18:3000/lastName> "Bayer" .
`

export const successOutgoingDefaultGroup = `
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://www.w3.org/2000/01/rdf-schema#label> "Friedrich Bayer" .
<http://10.122.106.18:3000/Person/FriedrichBayer> <http://10.122.106.18:3000/lastName> "Bayer" .
`