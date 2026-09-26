export type RequestStatus = "Pending" | "Approved" | "Denied" | "Ready"

export type ExamType =
  "X-Ray" | "Ultrasound" | "MRI" | "CT Scan" | "Mammography"

export type ReportStatus = "Preliminary" | "Final" | "Amended"

export type Exam = {
  id: string
  type: ExamType
  bodyPart: string
  hospital: string
  performedAt: string
  accessionNumber: string
  referringPhysician: string
  notes: string
  radiologist: string
  reportStatus: ReportStatus
  findings: string
}

export type DestinationKind =
  "Clinic" | "Doctor" | "Law Firm" | "Insurance" | "Self"

export type Destination = {
  id: string
  name: string
  kind: DestinationKind
  address: string
}

export type Hospital = {
  name: string
  address: string
  phone: string
  email: string
}

export type ReleaseRequest = {
  id: string
  examId: string
  destinationId: string
  status: RequestStatus
  requestedAt: string
}

export const mockExams: Exam[] = [
  {
    id: "e1",
    type: "X-Ray",
    bodyPart: "Chest",
    hospital: "Hospital São Lucas",
    performedAt: "2026-09-14",
    accessionNumber: "SLC-48213",
    referringPhysician: "Dr. Eduardo Ramos",
    notes: "Persistent cough, rule out pneumonia.",
    radiologist: "Dr. Henrique Salles",
    reportStatus: "Final",
    findings: "No acute infiltrate or consolidation. Lungs clear.",
  },
  {
    id: "e2",
    type: "MRI",
    bodyPart: "Brain",
    hospital: "Instituto de Diagnóstico por Imagem",
    performedAt: "2026-09-08",
    accessionNumber: "IDI-77042",
    referringPhysician: "Dra. Beatriz Nogueira",
    notes: "Recurrent headaches, evaluate for structural abnormalities.",
    radiologist: "Dra. Patrícia Lemos",
    reportStatus: "Final",
    findings:
      "No acute intracranial abnormality. No mass effect or midline shift.",
  },
  {
    id: "e3",
    type: "CT Scan",
    bodyPart: "Abdomen",
    hospital: "Hospital São Lucas",
    performedAt: "2026-08-30",
    accessionNumber: "SLC-48390",
    referringPhysician: "Dr. Marcelo Ayres",
    notes: "Abdominal pain, evaluate for appendicitis.",
    radiologist: "Dr. Henrique Salles",
    reportStatus: "Final",
    findings:
      "Appendix within normal limits. No free fluid or signs of inflammation.",
  },
  {
    id: "e4",
    type: "X-Ray",
    bodyPart: "Knee",
    hospital: "Clínica Imagem Total",
    performedAt: "2026-08-25",
    accessionNumber: "CIT-31204",
    referringPhysician: "Dr. Eduardo Ramos",
    notes: "Knee pain after sports injury.",
    radiologist: "Dra. Patrícia Lemos",
    reportStatus: "Preliminary",
    findings: "No fracture or dislocation. Mild joint effusion.",
  },
  {
    id: "e5",
    type: "Mammography",
    bodyPart: "Breast",
    hospital: "Hospital Santa Marina",
    performedAt: "2026-08-18",
    accessionNumber: "SM-90211",
    referringPhysician: "Dra. Fernanda Lopes",
    notes: "Routine screening mammography.",
    radiologist: "Dra. Patrícia Lemos",
    reportStatus: "Final",
    findings:
      "No suspicious masses or microcalcifications. BI-RADS category 1.",
  },
  {
    id: "e6",
    type: "MRI",
    bodyPart: "Cervical Spine",
    hospital: "Instituto de Diagnóstico por Imagem",
    performedAt: "2026-09-12",
    accessionNumber: "IDI-77118",
    referringPhysician: "Dr. Paulo Cesar Vieira",
    notes: "Neck pain radiating to left arm.",
    radiologist: "Dra. Patrícia Lemos",
    reportStatus: "Final",
    findings:
      "Mild disc bulge at C5-C6 with mild neural foraminal narrowing. No cord compression.",
  },
  {
    id: "e7",
    type: "X-Ray",
    bodyPart: "Shoulder",
    hospital: "Clínica Imagem Total",
    performedAt: "2026-09-01",
    accessionNumber: "CIT-31350",
    referringPhysician: "Dra. Camila Torres",
    notes: "Shoulder pain, evaluate rotator cuff.",
    radiologist: "Dr. Henrique Salles",
    reportStatus: "Final",
    findings:
      "No fracture. Mild subacromial spurring, possibly associated with rotator cuff impingement.",
  },
  {
    id: "e8",
    type: "X-Ray",
    bodyPart: "Neck",
    hospital: "Hospital São Lucas",
    performedAt: "2026-09-05",
    accessionNumber: "SLC-48501",
    referringPhysician: "Dr. Marcelo Ayres",
    notes: "Neck stiffness following minor trauma.",
    radiologist: "Dra. Patrícia Lemos",
    reportStatus: "Preliminary",
    findings:
      "No fracture or malalignment. No significant soft tissue swelling.",
  },
  {
    id: "e9",
    type: "Ultrasound",
    bodyPart: "Abdomen",
    hospital: "Instituto de Diagnóstico por Imagem",
    performedAt: "2026-08-22",
    accessionNumber: "IDI-77205",
    referringPhysician: "Dra. Beatriz Nogueira",
    notes: "Abdominal discomfort, evaluate gallbladder.",
    radiologist: "Dr. Henrique Salles",
    reportStatus: "Final",
    findings:
      "Gallbladder without stones or wall thickening. Liver, pancreas, and kidneys unremarkable.",
  },
  {
    id: "e10",
    type: "Ultrasound",
    bodyPart: "Abdomen",
    hospital: "Instituto de Diagnóstico por Imagem",
    performedAt: "2026-08-30",
    accessionNumber: "IDI-77260",
    referringPhysician: "Dra. Beatriz Nogueira",
    notes: "Follow-up ultrasound, prior findings.",
    radiologist: "Dr. Henrique Salles",
    reportStatus: "Final",
    findings: "Stable appearance compared to prior study. No new findings.",
  },
]

export const mockHospitals: Hospital[] = [
  {
    name: "Hospital São Lucas",
    address: "Av. Angélica, 1800 — São Paulo, SP",
    phone: "(11) 3256-4400",
    email: "contato@hospitalsaolucas.com.br",
  },
  {
    name: "Instituto de Diagnóstico por Imagem",
    address: "Rua Vergueiro, 620 — São Paulo, SP",
    phone: "(11) 5083-2200",
    email: "atendimento@idi.com.br",
  },
  {
    name: "Clínica Imagem Total",
    address: "Av. Ibirapuera, 2332 — São Paulo, SP",
    phone: "(11) 5561-9090",
    email: "contato@imagemtotal.com.br",
  },
  {
    name: "Hospital Santa Marina",
    address: "Rua Dr. Diogo de Faria, 1087 — São Paulo, SP",
    phone: "(11) 5080-8000",
    email: "contato@hospitalsantamarina.com.br",
  },
]

export const mockDestinations: Destination[] = [
  {
    id: "d1",
    name: "Clínica Dr. Ricardo Mendes",
    kind: "Doctor",
    address: "Av. Paulista, 1000 — São Paulo, SP",
  },
  {
    id: "d2",
    name: "Clínica Neurológica Vitta",
    kind: "Clinic",
    address: "Rua Augusta, 500 — São Paulo, SP",
  },
  {
    id: "d3",
    name: "Dra. Camila Torres — Gastro",
    kind: "Doctor",
    address: "Rua Oscar Freire, 200 — São Paulo, SP",
  },
  {
    id: "d4",
    name: "Ortopedia Bandeirantes",
    kind: "Clinic",
    address: "Av. Bandeirantes, 300 — São Paulo, SP",
  },
  {
    id: "d5",
    name: "Dra. Fernanda Lopes — Oncologia",
    kind: "Doctor",
    address: "Rua Haddock Lobo, 150 — São Paulo, SP",
  },
  {
    id: "d6",
    name: "Fisioterapia ReabilitaMed",
    kind: "Clinic",
    address: "Av. Rebouças, 800 — São Paulo, SP",
  },
  {
    id: "d7",
    name: "Almeida & Souza Advogados",
    kind: "Law Firm",
    address: "Av. Brigadeiro Faria Lima, 2000 — São Paulo, SP",
  },
  {
    id: "d8",
    name: "Porto Seguro Saúde",
    kind: "Insurance",
    address: "Rua Guaianases, 1238 — São Paulo, SP",
  },
  {
    id: "self",
    name: "Myself",
    kind: "Self",
    address: "Available in this app",
  },
]

export const mockRequests: ReleaseRequest[] = [
  {
    id: "1",
    examId: "e1",
    destinationId: "d1",
    status: "Pending",
    requestedAt: "2026-09-15",
  },
  {
    id: "2",
    examId: "e2",
    destinationId: "d2",
    status: "Approved",
    requestedAt: "2026-09-10",
  },
  {
    id: "3",
    examId: "e3",
    destinationId: "d3",
    status: "Ready",
    requestedAt: "2026-09-02",
  },
  {
    id: "4",
    examId: "e4",
    destinationId: "d4",
    status: "Denied",
    requestedAt: "2026-08-28",
  },
  {
    id: "5",
    examId: "e5",
    destinationId: "d5",
    status: "Ready",
    requestedAt: "2026-08-20",
  },
  {
    id: "6",
    examId: "e8",
    destinationId: "d7",
    status: "Pending",
    requestedAt: "2026-09-16",
  },
  {
    id: "7",
    examId: "e6",
    destinationId: "self",
    status: "Approved",
    requestedAt: "2026-09-13",
  },
]

export function getExamById(examId: string): Exam | undefined {
  return mockExams.find((exam) => exam.id === examId)
}

export function getDestinationById(
  destinationId: string,
): Destination | undefined {
  return mockDestinations.find(
    (destination) => destination.id === destinationId,
  )
}

export function getHospitalByName(name: string): Hospital | undefined {
  return mockHospitals.find((hospital) => hospital.name === name)
}

export function getRequestsByExamId(examId: string): ReleaseRequest[] {
  return mockRequests.filter((request) => request.examId === examId)
}

export function getSelfRequestForExam(
  examId: string,
): ReleaseRequest | undefined {
  return mockRequests.find(
    (request) => request.examId === examId && request.destinationId === "self",
  )
}

export function isExamUnlocked(examId: string): boolean {
  const selfRequest = getSelfRequestForExam(examId)
  return selfRequest?.status === "Approved" || selfRequest?.status === "Ready"
}

export function examLabel(exam: Exam): string {
  return `${exam.bodyPart} ${exam.type}`
}
