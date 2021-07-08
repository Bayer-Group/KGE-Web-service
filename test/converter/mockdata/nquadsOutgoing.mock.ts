export const nquadsOutgoing = `
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/worksOn> <http://10.122.106.18:3000/KnowledgeSpace> .
<http://10.122.106.18:3000/KnowledgeSpace> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/Project> .
<http://10.122.106.18:3000/KnowledgeSpace> <http://www.w3.org/2000/01/rdf-schema#label> "Knowledge Space" .
<http://10.122.106.18:3000/KnowledgeSpace> <http://10.122.106.18:3000/workedOnBy> <http://10.122.106.18:3000/Person/glqze> .
<http://10.122.106.18:3000/KnowledgeSpace> <http://www.w3.org/1999/02/22-rdf-syntax-ns#test> <http://10.122.106.18:3000/Person/glqze> .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://pid.bayer.com/kos/19014/Person> .
<http://pid.bayer.com/kos/19014/Person> <http://www.w3.org/2000/01/rdf-schema#label> "Person" .
<http://pid.bayer.com/kos/19014/Person> <http://www.w3.org/2000/01/rdf-schema#comment> "This is a person, saved in ontorest" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/offers> <http://10.122.106.18:3000/Product/LinkedDataBasics> .
<http://10.122.106.18:3000/Product/LinkedDataBasics> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/Product> .
<http://10.122.106.18:3000/Product/LinkedDataBasics> <http://www.w3.org/2000/01/rdf-schema#label> "Training on Basics of Linked Data" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/isLocateIn> <http://10.122.106.18:3000/bln_m427> .
<http://10.122.106.18:3000/bln_m427> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/OfficeBuilding> .
<http://10.122.106.18:3000/bln_m427> <http://www.w3.org/2000/01/rdf-schema#label> "Building M427" .
<http://10.122.106.18:3000/bln_m427> <http://10.122.106.18:3000/hasPicture> <https://bayernet.int.bayer.com/-/media/bag-intra/ws_bayernet/germany/ph-berlin/shared/news/standardbilder/luftbild.jpg?h=400&w=600&la=de-DE&hash=BE36C5761EDC42E094380C68714B0F2A> .
<http://10.122.106.18:3000/bln_m427> <http://10.122.106.18:3000/hasPicture> "https://transkript.de/fileadmin//transkript/01_Nachrichten/2020/2020_02_11_bayer_berlin.jpg" .
<http://10.122.106.18:3000/bln_m427> <http://10.122.106.18:3000/street> "Gerichtstr. " .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/affiliatedWith> <http://10.122.106.18:3000/companies/Bayer> .
<http://10.122.106.18:3000/companies/Bayer> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/Company> .
<http://10.122.106.18:3000/companies/Bayer> <http://www.w3.org/2000/01/rdf-schema#label> "Bayer AG" .
<http://10.122.106.18:3000/companies/Bayer> <http://10.122.106.18:3000/hasPicture> <https://bayernet.int.bayer.com/-/media/bag-intra/ws_bayernet/site-configuration/logo/bayer-logo.svg?la=de-DE&hash=D39973A6139797AC177B7D529C2F27F6> .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/firstName> "G\u00F6khan" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/hasPicture> <https://mug0eu-1.assets-yammer.com/mugshot/images/Ph0GLscW22mMsf2MPwTxw9K2DPD1J1fl> .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/lastName> "Coskun" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://www.w3.org/2000/01/rdf-schema#label> "G\u00F6khan Coskun" .
`

export const nquadsOutgoing2 = `
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/worksOn> <http://10.122.106.18:3000/KnowledgeSpace> .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://www.w3.org/2000/01/rdf-schema#label> "G\u00F6khan Coskun" .
`

export const nquadsOutgoing3 = `
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/worksOn> <http://10.122.106.18:3000/KnowledgeSpace> .
<http://10.122.106.18:3000/bln_m427> <http://www.w3.org/2000/01/rdf-schema#label> "Building M427" .
<http://10.122.106.18:3000/KnowledgeSpace> <http://www.w3.org/2000/01/rdf-schema#label> "Knowledge Space" .
<http://10.122.106.18:3000/companies/Bayer> <http://10.122.106.18:3000/hasPicture> <https://bayernet.int.bayer.com/-/media/bag-intra/ws_bayernet/site-configuration/logo/bayer-logo.svg?la=de-DE&hash=D39973A6139797AC177B7D529C2F27F6> .
<http://10.122.106.18:3000/bln_m427> <http://10.122.106.18:3000/hasPicture> <https://bayernet.int.bayer.com/-/media/bag-intra/ws_bayernet/germany/ph-berlin/shared/news/standardbilder/luftbild.jpg?h=400&w=600&la=de-DE&hash=BE36C5761EDC42E094380C68714B0F2A> .
<http://10.122.106.18:3000/KnowledgeSpace> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/Project> .
<http://10.122.106.18:3000/KnowledgeSpace> <http://10.122.106.18:3000/workedOnBy> <http://10.122.106.18:3000/Person/glqze> .
<http://10.122.106.18:3000/KnowledgeSpace> <http://www.w3.org/1999/02/22-rdf-syntax-ns#test> <http://10.122.106.18:3000/Person/glqze> .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://pid.bayer.com/kos/19014/Person> .
<http://pid.bayer.com/kos/19014/Person> <http://www.w3.org/2000/01/rdf-schema#label> "Person" .
<http://pid.bayer.com/kos/19014/Person> <http://www.w3.org/2000/01/rdf-schema#comment> "This is a person, saved in ontorest" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/offers> <http://10.122.106.18:3000/Product/LinkedDataBasics> .
<http://10.122.106.18:3000/Product/LinkedDataBasics> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/Product> .
<http://10.122.106.18:3000/Product/LinkedDataBasics> <http://www.w3.org/2000/01/rdf-schema#label> "Training on Basics of Linked Data" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/isLocateIn> <http://10.122.106.18:3000/bln_m427> .
<http://10.122.106.18:3000/bln_m427> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/OfficeBuilding> .
<http://10.122.106.18:3000/bln_m427> <http://10.122.106.18:3000/hasPicture> "https://transkript.de/fileadmin//transkript/01_Nachrichten/2020/2020_02_11_bayer_berlin.jpg" .
<http://10.122.106.18:3000/bln_m427> <http://10.122.106.18:3000/street> "Gerichtstr. " .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/affiliatedWith> <http://10.122.106.18:3000/companies/Bayer> .
<http://10.122.106.18:3000/companies/Bayer> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://10.122.106.18:3000/Company> .
<http://10.122.106.18:3000/companies/Bayer> <http://www.w3.org/2000/01/rdf-schema#label> "Bayer AG" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/firstName> "G\u00F6khan" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/hasPicture> <https://mug0eu-1.assets-yammer.com/mugshot/images/Ph0GLscW22mMsf2MPwTxw9K2DPD1J1fl> .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://10.122.106.18:3000/lastName> "Coskun" .
<http://pid.bayer.com/kos/19014/1/ggvcm> <http://www.w3.org/2000/01/rdf-schema#label> "G\u00F6khan Coskun" .
`