// =====================================================
// AML / KYC PDF Overlay Coordinates — PURE POSITION-BASED FILL
// =====================================================
// We IGNORE the PDF's internal field names (many are misleading, e.g. a field
// named "Nationality Occupation" sits next to the "Occupation:" label).
// Instead, every data point maps to an (x, y) coordinate where we draw the
// value directly on the page. This matches exactly what the realtor-paperwork
// skill does with reportlab.
//
// Page size: US Letter 612 x 792, origin = bottom-left.
// Text: Helvetica 10, ALL CAPS. Checkbox marks: Helvetica-Bold 8, 'X'.
// =====================================================
// Shape per form:
//   text[n]       = [{ x, y, key }]           - value drawn at (x, y), baseline
//   checkboxes[n] = [{ x, y, key, match }]    - 'X' drawn at (x, y) if matched
//      - `match` defined: draw X when data[key] === match
//      - `match` undefined: draw X when data[key] is truthy
// =====================================================

window.AML_FORM_COORDS = {

    // =================================================
    // Form A1 — Customer Particulars (Individual), 1 page
    // =================================================
    formA1: {
        pages: 1,
        text: {
            1: [
                { x: 129, y: 709, key: 'resName' },
                { x: 411, y: 709, key: 'resReg' },
                { x: 187, y: 687, key: 'dateOfForm' },
                { x: 229, y: 598, key: 'client.fullName' },
                { x: 202, y: 522, key: 'client.nricOrPassport' },
                { x: 375, y: 522, key: 'client.dob' },
                { x: 165, y: 488, key: 'client.address' },
                { x: 142, y: 452, key: 'client.nationality' },
                { x: 345, y: 452, key: 'client.occupation' },
                { x: 225, y: 408, key: 'propertyAddress' },
                { x: 112, y: 182, key: 'client.fullName' }     // Acknowledgement name
            ]
        },
        checkboxes: {
            1: [
                // RES is representing (top of form): Buyer / Seller / Landlord / Tenant
                { x: 364.0, y: 684.5, key: 'repRole', match: 'Buyer' },
                { x: 399.0, y: 684.3, key: 'repRole', match: 'Seller' },
                { x: 434.6, y: 684.2, key: 'repRole', match: 'Landlord' },
                { x: 481.9, y: 684.2, key: 'repRole', match: 'Tenant' },

                // Client ID type (Identity card / Passport / Work permit / Others)
                { x:  81.8, y: 556.5, key: 'client.idType', match: 'NRIC' },
                { x: 143.8, y: 556.6, key: 'client.idType', match: 'Passport' },
                { x: 191.6, y: 556.5, key: 'client.idType', match: 'WorkPermit' },
                { x: 252.9, y: 556.4, key: 'client.idType', match: 'Others' },

                // Property type (HDB Resale / Condo / Landed / Others — or similar, 4 boxes)
                { x: 158.5, y: 388.5, key: 'propertyKind', match: 'HDB' },
                { x: 235.7, y: 388.5, key: 'propertyKind', match: 'Condo' },
                { x: 282.6, y: 388.6, key: 'propertyKind', match: 'Landed' },
                { x: 367.8, y: 388.5, key: 'propertyKind', match: 'Others' },

                // Acting capacity (self / on behalf of individual / on behalf of corporate)
                { x:  82.7, y: 376.6, key: 'client.actingForSelf',            match: true },
                { x:  82.6, y: 364.5, key: 'client.actingOnBehalfIndividual', match: true },
                { x:  82.8, y: 352.0, key: 'client.actingOnBehalfCorporate',  match: true }
            ]
        }
    },

    // =================================================
    // Form A2 — Customer Particulars (Entity), 2 pages
    // =================================================
    formA2: {
        pages: 2,
        text: {
            1: [
                { x: 129, y: 709, key: 'resName' },
                { x: 411, y: 709, key: 'resReg' },
                { x: 187, y: 687, key: 'dateOfForm' },
                { x: 179, y: 575, key: 'entity.name' },
                { x: 194, y: 545, key: 'entity.registeredAddress' },
                { x: 161, y: 471, key: 'entity.phone' },
                { x: 358, y: 475, key: 'entity.email' },
                { x: 243, y: 440, key: 'entity.uen' },
                { x: 222, y: 405, key: 'entity.dateOfIncorp' },
                { x: 281, y: 370, key: 'entity.country' },
                { x: 177, y: 335, key: 'entity.mainBusiness' },
                { x: 380, y: 510, key: 'entity.authLetterRef' },   // Copy of Letter of Auth
                { x: 181, y: 232, key: 'entity.p1Designation' },
                { x: 226, y: 213, key: 'entity.p1Name' },
                { x: 201, y: 173, key: 'entity.p1Nric' },
                { x: 345, y: 175, key: 'entity.p1Nationality' },
                { x: 181, y: 156, key: 'entity.p2Designation' },
                { x: 226, y: 137, key: 'entity.p2Name' },
                { x: 201, y: 100, key: 'entity.p2Nric' },
                { x: 345, y: 100, key: 'entity.p2Nationality' }
            ],
            2: [
                { x: 224, y: 631, key: 'bo1.fullName' },
                { x: 165, y: 575, key: 'bo1.address' },
                { x: 203, y: 556, key: 'bo1.nricOrPassport' },
                { x: 343, y: 556, key: 'bo1.dob' },
                { x: 129, y: 536, key: 'bo1.nationality' },
                { x: 345, y: 537, key: 'bo1.occupation' },
                // BO2 (mirror positions, shifted down)
                { x: 224, y: 490, key: 'bo2.fullName' },
                { x: 165, y: 434, key: 'bo2.address' },
                { x: 203, y: 415, key: 'bo2.nricOrPassport' },
                { x: 343, y: 415, key: 'bo2.dob' },
                { x: 129, y: 394, key: 'bo2.nationality' },
                { x: 345, y: 395, key: 'bo2.occupation' }
            ]
        },
        checkboxes: {
            1: [
                // RES is representing (top)
                { x: 170.4, y: 662.9, key: 'repRole', match: 'Buyer' },
                { x: 205.6, y: 662.7, key: 'repRole', match: 'Seller' },
                { x: 240.5, y: 662.6, key: 'repRole', match: 'Landlord' },
                { x: 290.9, y: 662.5, key: 'repRole', match: 'Tenant' },

                // Authorised to act Yes / No (image-estimated, may need +/- adjustment)
                { x: 144, y: 607, key: 'entity.authorised', match: true },
                { x: 189, y: 607, key: 'entity.authorised', match: false },

                // Entity type
                { x: 225.0, y: 308.0, key: 'entity.type', match: 'LimitedPartnership' },
                { x: 318.7, y: 308.0, key: 'entity.type', match: 'LLP' },
                { x: 442.7, y: 308.0, key: 'entity.type', match: 'Company' },
                { x:  82.5, y: 288.2, key: 'entity.type', match: 'Corporation' },
                { x: 150.9, y: 287.7, key: 'entity.type', match: 'Trust' },

                // Senior mgmt = BO Yes / No
                { x: 471, y: 258, key: 'entity.seniorMgmtIsBO', match: true },
                { x: 475, y: 258, key: 'entity.seniorMgmtIsBO', match: false },

                // Person 1 ID type
                { x: 218.9, y: 190.6, key: 'entity.p1IdType', match: 'NRIC' },
                { x: 280.5, y: 190.9, key: 'entity.p1IdType', match: 'Passport' },
                { x: 328.0, y: 190.7, key: 'entity.p1IdType', match: 'WorkPermit' },
                { x: 390.2, y: 191.0, key: 'entity.p1IdType', match: 'Others' },

                // Person 2 ID type
                { x: 218.6, y: 115.7, key: 'entity.p2IdType', match: 'NRIC' },
                { x: 280.6, y: 115.6, key: 'entity.p2IdType', match: 'Passport' },
                { x: 328.5, y: 115.7, key: 'entity.p2IdType', match: 'WorkPermit' },
                { x: 389.7, y: 115.4, key: 'entity.p2IdType', match: 'Others' }
            ],
            2: [
                // BO1 ID type
                { x:  81.7, y: 591.0, key: 'bo1.idType', match: 'NRIC' },
                { x: 143.5, y: 590.9, key: 'bo1.idType', match: 'Passport' },
                { x: 191.7, y: 590.9, key: 'bo1.idType', match: 'WorkPermit' },
                { x: 253.3, y: 590.9, key: 'bo1.idType', match: 'Others' },
                // BO2 ID type
                { x:  82.0, y: 448.6, key: 'bo2.idType', match: 'NRIC' },
                { x: 144.2, y: 448.9, key: 'bo2.idType', match: 'Passport' },
                { x: 191.5, y: 448.6, key: 'bo2.idType', match: 'WorkPermit' },
                { x: 252.9, y: 448.5, key: 'bo2.idType', match: 'Others' }
            ]
        }
    },

    // =================================================
    // Form A3 — Individual client acts on behalf of, 1 page
    // =================================================
    formA3: {
        pages: 1,
        text: {
            1: [
                { x: 167, y: 638, key: 'principal.fullName' },
                { x: 167, y: 573, key: 'principal.address' },
                { x: 167, y: 551, key: 'principal.nricOrPassport' },
                { x: 354, y: 551, key: 'principal.dob' },
                { x: 167, y: 529, key: 'principal.nationality' },
                { x: 354, y: 529, key: 'principal.occupation' },
                { x: 167, y: 507, key: 'principal.idOthersDetail' }    // "Others (please specify)"
            ]
        },
        checkboxes: {
            1: [
                // Client authorised to act Yes / No
                { x: 323.6, y: 675.1, key: 'principal.clientAuthorised', match: true },
                { x: 353.3, y: 675.4, key: 'principal.clientAuthorised', match: false },
                // Principal ID type
                { x:  81.3, y: 602.2, key: 'principal.idType', match: 'NRIC' },
                { x: 143.7, y: 602.2, key: 'principal.idType', match: 'Passport' },
                { x: 191.9, y: 602.0, key: 'principal.idType', match: 'WorkPermit' },
                { x: 253.0, y: 602.0, key: 'principal.idType', match: 'Others' }
            ]
        }
    },

    // =================================================
    // Women's Charter Checklist (for Residential Lease), 2 pages, A4 (596 x 842)
    // Notes:
    //   - "Yes/No" answers are TEXT fields, not checkboxes (user types "YES" or "NO").
    //   - Rows 1-3 are for SC/PR tenants; rows 4-6 are for Foreigner tenants.
    //     We fill only the relevant section based on Step 5 citizenship question.
    //   - Page 2 has two signature blocks: RES (salesperson) + Landlord/Tenant.
    //     We fill whichever RES column matches William's rep role. The other
    //     column stays blank (the co-broke agent fills their own).
    // =================================================
    womensCharter: {
        pages: 2,
        text: {
            1: [
                // Top of form — new template moved fields to the RIGHT of each label.
                // Rects from the annotation dump:
                //   Address:    [165.4, 431.4, 540.6, 440.5]
                //   LeaseStart: [150.5, 412.8, 313.2, 420.2]
                //   LeaseEnd:   [395.5, 412.8, 540.6, 420.2]
                { x: 168, y: 434, key: 'propertyAddress' },
                { x: 153, y: 415, key: 'leaseStart' },
                { x: 398, y: 415, key: 'leaseEnd' },

                // Rows 1-3 — SC/PR checks (only fill if any tenant is SC or PR)
                { x: 365, y: 330, key: 'wcAnswerSCPR' },      // Row 1 — Check original NRICs
                { x: 365, y: 300, key: 'wcAnswerSCPR' },      // Row 2 — Photographs vs actual persons
                { x: 365, y: 266, key: 'wcAnswerSCPR' },      // Row 3 — Verify NRIC via ICA

                // Rows 4-5 — Foreigner checks (only fill if any tenant is a foreigner)
                { x: 365, y: 207, key: 'wcAnswerForeign' },   // Row 4 — Check immigration passes
                { x: 365, y: 169, key: 'wcAnswerForeign' }    // Row 5 — Cross-check pass details
            ],
            2: [
                // Page 2 row 6 — Verify passes via MOM/ICA/FileSG (foreigner section)
                { x: 365, y: 722, key: 'wcAnswerForeign' },

                // --- RES signature block (y=495-545) ---
                // LEFT column — RES representing Landlord
                { x: 108, y: 537, key: 'wcLeftResName' },     // Name:
                { x: 151, y: 524, key: 'wcLeftResReg' },      // Registration No:
                { x: 139, y: 510, key: 'wcLeftResEA' },       // Estate Agent:
                { x: 101, y: 497, key: 'wcLeftResDate' },     // Date:
                // RIGHT column — RES representing Tenant
                { x: 346, y: 539, key: 'wcRightResName' },    // Name:
                { x: 387, y: 525, key: 'wcRightResReg' },     // Registration No:
                { x: 376, y: 512, key: 'wcRightResEA' },      // Estate Agent:
                { x: 340, y: 498, key: 'wcRightResDate' },    // Date:

                // --- Landlord/Tenant acknowledgement block (y=335-345) ---
                { x: 160, y: 340, key: 'wcLandlordName' },    // Name of Landlord:
                { x: 449, y: 338, key: 'wcTenantName' }       // Name of Main Tenant:
            ]
        },
        checkboxes: {}
    },

    // =================================================
    // Form U1 — Unrepresented Counterparty (Individual), 1 page
    // =================================================
    formU1: {
        pages: 1,
        text: {
            1: [
                { x: 130, y: 711, key: 'resName' },
                { x: 354, y: 711, key: 'resReg' },
                { x: 187, y: 689, key: 'dateOfForm' },
                { x: 224, y: 625, key: 'counterparty.fullName' },
                { x: 200, y: 560, key: 'counterparty.nricOrPassport' },
                { x: 375, y: 563, key: 'counterparty.dob' },
                { x: 165, y: 544, key: 'counterparty.address' },
                { x: 127, y: 523, key: 'counterparty.nationality' },
                { x: 345, y: 525, key: 'counterparty.occupation' },
                { x: 344, y: 579, key: 'counterparty.idOthersDetail' },       // Others specify on ID type row
                { x: 405, y: 464, key: 'counterparty.propertyOthersDetail' }, // Others specify on property type
                { x: 225, y: 485, key: 'propertyAddress' },
                { x: 112, y: 242, key: 'counterparty.fullName' }              // Acknowledgement name
            ]
        },
        checkboxes: {
            1: [
                // Counterparty role (at top, y≈684)
                { x: 320.1, y: 684.1, key: 'counterparty.role', match: 'Buyer' },
                { x: 358.1, y: 684.3, key: 'counterparty.role', match: 'Seller' },
                { x: 395.4, y: 684.3, key: 'counterparty.role', match: 'Landlord' },
                { x: 445.9, y: 684.4, key: 'counterparty.role', match: 'Tenant' },

                // ID type (y≈577)
                { x:  81.7, y: 577.0, key: 'counterparty.idType', match: 'NRIC' },
                { x: 143.7, y: 577.1, key: 'counterparty.idType', match: 'Passport' },
                { x: 191.7, y: 577.0, key: 'counterparty.idType', match: 'WorkPermit' },
                { x: 253.2, y: 577.0, key: 'counterparty.idType', match: 'Others' },

                // Property type (y≈464)
                { x: 158.6, y: 464.4, key: 'propertyKind', match: 'HDB' },
                { x: 236.2, y: 464.1, key: 'propertyKind', match: 'Condo' },
                { x: 282.6, y: 464.2, key: 'propertyKind', match: 'Landed' },
                { x: 368.2, y: 464.1, key: 'propertyKind', match: 'Others' },

                // Acting capacity vertical (x≈83)
                { x:  82.8, y: 452.9, key: 'counterparty.actingForSelf',            match: true },
                { x:  82.8, y: 439.6, key: 'counterparty.actingOnBehalfIndividual', match: true },
                { x:  82.8, y: 427.4, key: 'counterparty.actingOnBehalfCorporate',  match: true }
            ]
        }
    },

    // =================================================
    // Form A4 — Particulars of Legal Person (Entity/Legal Arrangement)
    //          Your Client is Acting on Behalf Of, 2 pages
    // Page 1: Entity details (Section 1) + Senior Management Personnel 1-3 (Section 2)
    // Page 2: Beneficial Owners 4-5 (Section 3)
    // =================================================
    formA4: {
        pages: 2,
        text: {
            1: [
                // Section 1 — Particulars of Legal Person
                { x: 257.6, y: 616.7, key: 'entity.name' },
                { x: 189.7, y: 579.5, key: 'entity.registeredAddress' },
                { x:  76.9, y: 542.5, key: 'entity.principalAddress' },
                { x: 162.9, y: 523.2, key: 'entity.phone' },
                { x: 358.9, y: 523.6, key: 'entity.email' },
                { x: 246.7, y: 512.2, key: 'entity.uen' },
                { x: 469.2, y: 511.6, key: 'entity.dateOfIncorp' },
                { x: 277.6, y: 501.0, key: 'entity.country' },
                { x: 174.4, y: 482.3, key: 'entity.mainBusiness' },
                { x: 279.3, y: 441.2, key: 'entity.typeOthersDetail' },
                // Section 2 — Senior Management Person 1
                { x: 172.7, y: 368.0, key: 'entity.p1Designation' },
                { x: 225.0, y: 348.8, key: 'entity.p1Name' },
                { x: 344.0, y: 311.9, key: 'entity.p1IdOthersDetail' },
                { x: 203.2, y: 293.1, key: 'entity.p1Nric' },
                { x: 346.7, y: 293.2, key: 'entity.p1Nationality' },
                // Section 2 — Senior Management Person 2
                { x: 172.7, y: 274.0, key: 'entity.p2Designation' },
                { x: 225.0, y: 255.2, key: 'entity.p2Name' },
                { x: 344.0, y: 218.3, key: 'entity.p2IdOthersDetail' },
                { x: 204.1, y: 199.4, key: 'entity.p2Nric' },
                { x: 346.7, y: 199.6, key: 'entity.p2Nationality' }
                // Person 3 left blank — wizard currently collects only p1/p2
            ],
            2: [
                // Section 3 — Beneficial Owner 1 (Person 4 on the form)
                { x: 225.0, y: 638.8, key: 'bo1.fullName' },
                { x: 344.3, y: 601.3, key: 'bo1.idOthersDetail' },
                { x: 166.0, y: 582.4, key: 'bo1.address' },
                { x: 202.2, y: 562.6, key: 'bo1.nricOrPassport' },
                { x: 344.8, y: 563.9, key: 'bo1.dob' },
                { x: 128.6, y: 544.2, key: 'bo1.nationality' },
                { x: 346.7, y: 544.7, key: 'bo1.occupation' },
                // Section 3 — Beneficial Owner 2 (Person 5 on the form)
                { x: 225.0, y: 507.2, key: 'bo2.fullName' },
                { x: 344.0, y: 470.3, key: 'bo2.idOthersDetail' },
                { x: 166.0, y: 451.3, key: 'bo2.address' },
                { x: 202.9, y: 432.4, key: 'bo2.nricOrPassport' },
                { x: 344.8, y: 432.4, key: 'bo2.dob' },
                { x: 128.3, y: 412.8, key: 'bo2.nationality' },
                { x: 346.9, y: 413.6, key: 'bo2.occupation' }
            ]
        },
        checkboxes: {
            1: [
                // "Is the Client authorised to act on behalf of the Legal Person?"
                { x: 336.8, y: 664.9, key: 'formA4.clientAuthorised', match: 'Yes' },
                { x: 368.8, y: 665.0, key: 'formA4.clientAuthorised', match: 'No'  },
                // Type of entity / legal arrangement (Section 1 bottom row)
                { x: 225.2, y: 463.2, key: 'entity.type', match: 'LimitedPartnership' },
                { x: 318.4, y: 463.3, key: 'entity.type', match: 'LLP' },
                { x: 442.6, y: 463.2, key: 'entity.type', match: 'Company' },
                { x:  82.9, y: 443.4, key: 'entity.type', match: 'Corporation' },
                { x: 147.8, y: 443.2, key: 'entity.type', match: 'Trust' },
                { x: 184.7, y: 443.2, key: 'entity.type', match: 'Others' },
                // Person 1 ID type
                { x:  81.9, y: 312.0, key: 'entity.p1IdType', match: 'NRIC' },
                { x: 143.9, y: 312.2, key: 'entity.p1IdType', match: 'Passport' },
                { x: 191.5, y: 312.2, key: 'entity.p1IdType', match: 'WorkPermit' },
                { x: 253.0, y: 312.0, key: 'entity.p1IdType', match: 'Others' },
                // Person 2 ID type
                { x:  81.8, y: 218.7, key: 'entity.p2IdType', match: 'NRIC' },
                { x: 143.7, y: 218.6, key: 'entity.p2IdType', match: 'Passport' },
                { x: 191.5, y: 218.6, key: 'entity.p2IdType', match: 'WorkPermit' },
                { x: 252.9, y: 218.5, key: 'entity.p2IdType', match: 'Others' }
                // Person 3 ID type — no formData, left blank
            ],
            2: [
                // BO1 (Person 4) ID type
                { x:  81.4, y: 601.8, key: 'bo1.idType', match: 'NRIC' },
                { x: 143.8, y: 601.4, key: 'bo1.idType', match: 'Passport' },
                { x: 191.6, y: 601.4, key: 'bo1.idType', match: 'WorkPermit' },
                { x: 253.0, y: 601.4, key: 'bo1.idType', match: 'Others' },
                // BO2 (Person 5) ID type
                { x:  81.7, y: 470.4, key: 'bo2.idType', match: 'NRIC' },
                { x: 143.8, y: 470.4, key: 'bo2.idType', match: 'Passport' },
                { x: 191.5, y: 470.3, key: 'bo2.idType', match: 'WorkPermit' },
                { x: 253.2, y: 470.7, key: 'bo2.idType', match: 'Others' }
            ]
        }
    },

    // =================================================
    // Form B — AML Risk Determination & Screening Checklist (Client side), 3 pages
    // Page 1: Name + ID + Section 1 (6 PEP/sanctions Qs, 13 boxes)
    // Page 2: Section 2 (29 red flag indicators, 58 boxes — Yes col x≈460, No col x≈500)
    // Page 3: Reasons text + RES name/reg + Estate Agent + Date
    // Default: every Section 1 / Section 2 answer = 'No' (from buildAmlFieldData)
    // =================================================
    formB: {
        pages: 3,
        text: {
            1: [
                { x: 106.7, y: 651.7, key: 'client.fullName' },
                { x: 344.3, y: 651.7, key: 'client.nricOrPassport' }
            ],
            3: [
                { x:  78.1, y: 593.0, key: 'formB.riskReason', maxWidth: 450, size: 9, lineHeight: 13 },
                { x:  91.3, y: 466.7, key: 'resName' },
                { x: 303.0, y: 465.8, key: 'resReg' },
                { x: 164.0, y: 412.0, key: 'estateAgentName' },
                { x: 163.6, y: 380.0, key: 'dateOfForm' }
            ]
        },
        checkboxes: {
            1: [
                // Section 1 — Q1..Q5: No (top), Yes (bottom). Q6 has 3 options.
                { x: 332.7, y: 574.4, key: 'formB.s1.0', match: 'No'  },
                { x: 332.7, y: 554.5, key: 'formB.s1.0', match: 'Yes' },
                { x: 332.4, y: 534.4, key: 'formB.s1.1', match: 'No'  },
                { x: 332.8, y: 513.6, key: 'formB.s1.1', match: 'Yes' },
                { x: 333.1, y: 493.0, key: 'formB.s1.2', match: 'No'  },
                { x: 332.7, y: 481.3, key: 'formB.s1.2', match: 'Yes' },
                { x: 332.7, y: 405.3, key: 'formB.s1.3', match: 'No'  },
                { x: 333.0, y: 385.6, key: 'formB.s1.3', match: 'Yes' },
                { x: 332.5, y: 335.9, key: 'formB.s1.4', match: 'No'  },
                { x: 332.7, y: 316.0, key: 'formB.s1.4', match: 'Yes' },
                { x: 332.6, y: 276.7, key: 'formB.s1.5', match: 'No'  },
                { x: 332.7, y: 264.3, key: 'formB.s1.5', match: 'Yes' },
                { x: 332.8, y: 244.0, key: 'formB.s1.5', match: 'NA'  }
            ],
            2: [
                // Section 2 — 29 red flag indicators. Yes col x≈460, No col x≈500.
                { x: 461.1, y: 663.2, key: 'formB.s2.0',  match: 'Yes' }, { x: 500.6, y: 663.6, key: 'formB.s2.0',  match: 'No' },
                { x: 460.5, y: 635.7, key: 'formB.s2.1',  match: 'Yes' }, { x: 500.2, y: 635.6, key: 'formB.s2.1',  match: 'No' },
                { x: 460.3, y: 607.6, key: 'formB.s2.2',  match: 'Yes' }, { x: 500.6, y: 608.0, key: 'formB.s2.2',  match: 'No' },
                { x: 460.3, y: 586.1, key: 'formB.s2.3',  match: 'Yes' }, { x: 500.5, y: 585.7, key: 'formB.s2.3',  match: 'No' },
                { x: 461.0, y: 562.9, key: 'formB.s2.4',  match: 'Yes' }, { x: 500.2, y: 563.7, key: 'formB.s2.4',  match: 'No' },
                { x: 460.7, y: 541.8, key: 'formB.s2.5',  match: 'Yes' }, { x: 500.4, y: 541.6, key: 'formB.s2.5',  match: 'No' },
                { x: 460.7, y: 519.2, key: 'formB.s2.6',  match: 'Yes' }, { x: 500.4, y: 519.4, key: 'formB.s2.6',  match: 'No' },
                { x: 460.8, y: 497.7, key: 'formB.s2.7',  match: 'Yes' }, { x: 500.7, y: 497.2, key: 'formB.s2.7',  match: 'No' },
                { x: 460.4, y: 480.6, key: 'formB.s2.8',  match: 'Yes' }, { x: 500.3, y: 479.8, key: 'formB.s2.8',  match: 'No' },
                { x: 460.7, y: 462.2, key: 'formB.s2.9',  match: 'Yes' }, { x: 500.2, y: 462.1, key: 'formB.s2.9',  match: 'No' },
                { x: 460.5, y: 440.2, key: 'formB.s2.10', match: 'Yes' }, { x: 500.7, y: 440.5, key: 'formB.s2.10', match: 'No' },
                { x: 460.6, y: 422.8, key: 'formB.s2.11', match: 'Yes' }, { x: 500.4, y: 422.7, key: 'formB.s2.11', match: 'No' },
                { x: 460.4, y: 409.4, key: 'formB.s2.12', match: 'Yes' }, { x: 500.7, y: 409.3, key: 'formB.s2.12', match: 'No' },
                { x: 460.9, y: 396.8, key: 'formB.s2.13', match: 'Yes' }, { x: 500.6, y: 396.6, key: 'formB.s2.13', match: 'No' },
                { x: 460.5, y: 383.3, key: 'formB.s2.14', match: 'Yes' }, { x: 500.6, y: 383.7, key: 'formB.s2.14', match: 'No' },
                { x: 460.8, y: 370.2, key: 'formB.s2.15', match: 'Yes' }, { x: 500.5, y: 370.5, key: 'formB.s2.15', match: 'No' },
                { x: 460.4, y: 357.4, key: 'formB.s2.16', match: 'Yes' }, { x: 500.3, y: 357.7, key: 'formB.s2.16', match: 'No' },
                { x: 460.5, y: 344.6, key: 'formB.s2.17', match: 'Yes' }, { x: 500.7, y: 345.2, key: 'formB.s2.17', match: 'No' },
                { x: 460.6, y: 327.6, key: 'formB.s2.18', match: 'Yes' }, { x: 500.8, y: 327.8, key: 'formB.s2.18', match: 'No' },
                { x: 460.7, y: 310.1, key: 'formB.s2.19', match: 'Yes' }, { x: 500.4, y: 310.0, key: 'formB.s2.19', match: 'No' },
                { x: 460.5, y: 296.8, key: 'formB.s2.20', match: 'Yes' }, { x: 500.8, y: 296.7, key: 'formB.s2.20', match: 'No' },
                { x: 460.9, y: 284.2, key: 'formB.s2.21', match: 'Yes' }, { x: 500.7, y: 283.9, key: 'formB.s2.21', match: 'No' },
                { x: 460.6, y: 270.6, key: 'formB.s2.22', match: 'Yes' }, { x: 500.6, y: 271.1, key: 'formB.s2.22', match: 'No' },
                { x: 460.9, y: 257.6, key: 'formB.s2.23', match: 'Yes' }, { x: 500.6, y: 257.9, key: 'formB.s2.23', match: 'No' },
                { x: 460.5, y: 244.7, key: 'formB.s2.24', match: 'Yes' }, { x: 500.4, y: 245.0, key: 'formB.s2.24', match: 'No' },
                { x: 460.6, y: 232.0, key: 'formB.s2.25', match: 'Yes' }, { x: 500.8, y: 232.6, key: 'formB.s2.25', match: 'No' },
                { x: 460.7, y: 218.7, key: 'formB.s2.26', match: 'Yes' }, { x: 500.4, y: 219.0, key: 'formB.s2.26', match: 'No' },
                { x: 460.4, y: 205.8, key: 'formB.s2.27', match: 'Yes' }, { x: 500.2, y: 206.1, key: 'formB.s2.27', match: 'No' },
                { x: 460.4, y: 193.1, key: 'formB.s2.28', match: 'Yes' }, { x: 500.7, y: 193.7, key: 'formB.s2.28', match: 'No' }
            ]
        }
    },

    // =================================================
    // Form U5 — Risk Determination & Screening Checklist (Counterparty side), 3 pages
    // Same structure as Form B, but for the unrepresented counterparty.
    // Defaults: every Section 1 / Section 2 answer = 'No' (unless flagged in UI)
    // =================================================
    formU5: {
        pages: 3,
        text: {
            1: [
                { x: 106.7, y: 642.0, key: 'counterparty.fullName' },
                { x: 383.5, y: 641.3, key: 'counterparty.nricOrPassport' }
            ],
            3: [
                { x:  77.2, y: 595.0, key: 'formU5.riskReason', maxWidth: 450, size: 9, lineHeight: 13 },
                { x:  88.4, y: 547.6, key: 'resName' },
                { x: 294.9, y: 547.6, key: 'resReg' },
                { x: 164.0, y: 482.5, key: 'estateAgentName' },
                { x: 163.6, y: 449.4, key: 'dateOfForm' }
            ]
        },
        checkboxes: {
            1: [
                // Section 1 — Q1..Q5: No (top), Yes (bottom). Q6 has 3 options.
                { x: 332.7, y: 563.6, key: 'formU5.s1.0', match: 'No'  },
                { x: 333.3, y: 543.4, key: 'formU5.s1.0', match: 'Yes' },
                { x: 332.7, y: 501.4, key: 'formU5.s1.1', match: 'No'  },
                { x: 333.0, y: 480.8, key: 'formU5.s1.1', match: 'Yes' },
                { x: 332.2, y: 438.9, key: 'formU5.s1.2', match: 'No'  },
                { x: 332.9, y: 426.6, key: 'formU5.s1.2', match: 'Yes' },
                { x: 333.1, y: 373.7, key: 'formU5.s1.3', match: 'No'  },
                { x: 332.9, y: 354.2, key: 'formU5.s1.3', match: 'Yes' },
                { x: 332.3, y: 304.3, key: 'formU5.s1.4', match: 'No'  },
                { x: 332.3, y: 284.0, key: 'formU5.s1.4', match: 'Yes' },
                { x: 332.9, y: 205.1, key: 'formU5.s1.5', match: 'No'  },
                { x: 332.8, y: 185.8, key: 'formU5.s1.5', match: 'Yes' },
                { x: 332.5, y: 165.0, key: 'formU5.s1.5', match: 'NA'  }
            ],
            2: [
                // Section 2 — 29 red flag indicators. Yes col x≈460, No col x≈504.
                { x: 460.7, y: 663.2, key: 'formU5.s2.0',  match: 'Yes' }, { x: 503.8, y: 663.1, key: 'formU5.s2.0',  match: 'No' },
                { x: 460.9, y: 635.5, key: 'formU5.s2.1',  match: 'Yes' }, { x: 504.0, y: 635.6, key: 'formU5.s2.1',  match: 'No' },
                { x: 460.8, y: 608.2, key: 'formU5.s2.2',  match: 'Yes' }, { x: 504.0, y: 608.1, key: 'formU5.s2.2',  match: 'No' },
                { x: 461.0, y: 586.0, key: 'formU5.s2.3',  match: 'Yes' }, { x: 504.3, y: 585.8, key: 'formU5.s2.3',  match: 'No' },
                { x: 460.8, y: 563.8, key: 'formU5.s2.4',  match: 'Yes' }, { x: 504.0, y: 563.7, key: 'formU5.s2.4',  match: 'No' },
                { x: 460.9, y: 541.4, key: 'formU5.s2.5',  match: 'Yes' }, { x: 504.2, y: 541.3, key: 'formU5.s2.5',  match: 'No' },
                { x: 460.3, y: 519.3, key: 'formU5.s2.6',  match: 'Yes' }, { x: 503.6, y: 519.2, key: 'formU5.s2.6',  match: 'No' },
                { x: 460.6, y: 497.1, key: 'formU5.s2.7',  match: 'Yes' }, { x: 503.9, y: 497.0, key: 'formU5.s2.7',  match: 'No' },
                { x: 460.7, y: 479.4, key: 'formU5.s2.8',  match: 'Yes' }, { x: 504.0, y: 479.3, key: 'formU5.s2.8',  match: 'No' },
                { x: 460.8, y: 461.7, key: 'formU5.s2.9',  match: 'Yes' }, { x: 504.1, y: 461.6, key: 'formU5.s2.9',  match: 'No' },
                { x: 461.0, y: 440.3, key: 'formU5.s2.10', match: 'Yes' }, { x: 504.3, y: 440.2, key: 'formU5.s2.10', match: 'No' },
                { x: 460.9, y: 422.5, key: 'formU5.s2.11', match: 'Yes' }, { x: 504.2, y: 422.4, key: 'formU5.s2.11', match: 'No' },
                { x: 461.1, y: 409.7, key: 'formU5.s2.12', match: 'Yes' }, { x: 504.3, y: 409.5, key: 'formU5.s2.12', match: 'No' },
                { x: 461.1, y: 396.9, key: 'formU5.s2.13', match: 'Yes' }, { x: 504.4, y: 396.8, key: 'formU5.s2.13', match: 'No' },
                { x: 461.0, y: 384.0, key: 'formU5.s2.14', match: 'Yes' }, { x: 504.3, y: 383.9, key: 'formU5.s2.14', match: 'No' },
                { x: 460.9, y: 370.7, key: 'formU5.s2.15', match: 'Yes' }, { x: 504.2, y: 370.6, key: 'formU5.s2.15', match: 'No' },
                { x: 460.6, y: 358.3, key: 'formU5.s2.16', match: 'Yes' }, { x: 503.9, y: 358.2, key: 'formU5.s2.16', match: 'No' },
                { x: 460.8, y: 345.7, key: 'formU5.s2.17', match: 'Yes' }, { x: 504.1, y: 345.6, key: 'formU5.s2.17', match: 'No' },
                { x: 460.9, y: 332.9, key: 'formU5.s2.18', match: 'Yes' }, { x: 504.2, y: 332.8, key: 'formU5.s2.18', match: 'No' },
                { x: 460.9, y: 320.2, key: 'formU5.s2.19', match: 'Yes' }, { x: 504.2, y: 320.0, key: 'formU5.s2.19', match: 'No' },
                { x: 460.8, y: 307.3, key: 'formU5.s2.20', match: 'Yes' }, { x: 504.1, y: 307.2, key: 'formU5.s2.20', match: 'No' },
                { x: 460.7, y: 294.0, key: 'formU5.s2.21', match: 'Yes' }, { x: 504.0, y: 293.9, key: 'formU5.s2.21', match: 'No' },
                { x: 460.5, y: 280.3, key: 'formU5.s2.22', match: 'Yes' }, { x: 503.7, y: 280.2, key: 'formU5.s2.22', match: 'No' },
                { x: 460.8, y: 267.5, key: 'formU5.s2.23', match: 'Yes' }, { x: 504.1, y: 267.4, key: 'formU5.s2.23', match: 'No' },
                { x: 460.9, y: 254.6, key: 'formU5.s2.24', match: 'Yes' }, { x: 504.2, y: 254.5, key: 'formU5.s2.24', match: 'No' },
                { x: 460.9, y: 241.9, key: 'formU5.s2.25', match: 'Yes' }, { x: 504.2, y: 241.8, key: 'formU5.s2.25', match: 'No' },
                { x: 460.8, y: 229.0, key: 'formU5.s2.26', match: 'Yes' }, { x: 504.1, y: 228.9, key: 'formU5.s2.26', match: 'No' },
                { x: 460.8, y: 215.7, key: 'formU5.s2.27', match: 'Yes' }, { x: 504.1, y: 215.6, key: 'formU5.s2.27', match: 'No' },
                { x: 460.5, y: 203.3, key: 'formU5.s2.28', match: 'Yes' }, { x: 503.8, y: 203.2, key: 'formU5.s2.28', match: 'No' }
            ]
        }
    },

    // =================================================
    // Form U2 — Counterparty Particulars Form (For Entity / Legal Arrangement), 2 pages
    // Parallel to A2/A4 but for the counterparty side.
    // Page 1: Section 1 (entity details) + Section 2 (Senior Management Persons 1 & 2)
    // Page 2: Section 3 (Beneficial Owners 1 & 2)
    // =================================================
    formU2: {
        pages: 2,
        text: {
            1: [
                // Section 1 — Particulars of Entity
                { x: 174.6, y: 627.7, key: 'counterpartyEntity.name' },
                { x: 189.2, y: 609.0, key: 'counterpartyEntity.registeredAddress' },
                { x: 382.2, y: 589.5, key: 'counterpartyEntity.principalAddress' },
                { x: 162.1, y: 571.7, key: 'counterpartyEntity.phone' },
                { x: 361.0, y: 571.1, key: 'counterpartyEntity.email' },
                { x: 244.2, y: 552.4, key: 'counterpartyEntity.uen' },
                { x: 219.2, y: 533.6, key: 'counterpartyEntity.dateOfIncorp' },
                { x: 277.8, y: 514.9, key: 'counterpartyEntity.country' },
                { x: 174.4, y: 495.7, key: 'counterpartyEntity.mainBusiness' },
                { x: 281.1, y: 455.0, key: 'counterpartyEntity.typeOthersDetail' },
                // Section 2 — Senior Management Person 1
                { x: 179.6, y: 384.4, key: 'counterpartyEntity.p1Designation' },
                { x: 225.0, y: 365.6, key: 'counterpartyEntity.p1Name' },
                { x: 344.3, y: 328.2, key: 'counterpartyEntity.p1IdOthersDetail' },
                { x: 201.7, y: 308.7, key: 'counterpartyEntity.p1Nric' },
                { x: 346.7, y: 309.5, key: 'counterpartyEntity.p1Nationality' },
                // Section 2 — Senior Management Person 2
                { x: 179.6, y: 290.8, key: 'counterpartyEntity.p2Designation' },
                { x: 225.0, y: 272.0, key: 'counterpartyEntity.p2Name' },
                { x: 344.3, y: 234.6, key: 'counterpartyEntity.p2IdOthersDetail' },
                { x: 202.0, y: 215.9, key: 'counterpartyEntity.p2Nric' },
                { x: 346.7, y: 215.9, key: 'counterpartyEntity.p2Nationality' }
            ],
            2: [
                // Section 3 — Beneficial Owner 1
                { x: 225.2, y: 628.7, key: 'counterpartyBo1.fullName' },
                { x: 344.3, y: 591.2, key: 'counterpartyBo1.idOthersDetail' },
                { x: 166.0, y: 572.3, key: 'counterpartyBo1.address' },
                { x: 201.7, y: 554.1, key: 'counterpartyBo1.nricOrPassport' },
                { x: 344.8, y: 553.8, key: 'counterpartyBo1.dob' },
                { x: 129.9, y: 534.5, key: 'counterpartyBo1.nationality' },
                { x: 346.9, y: 535.1, key: 'counterpartyBo1.occupation' },
                // Section 3 — Beneficial Owner 2
                { x: 225.0, y: 486.6, key: 'counterpartyBo2.fullName' },
                { x: 344.3, y: 449.2, key: 'counterpartyBo2.idOthersDetail' },
                { x: 166.0, y: 430.2, key: 'counterpartyBo2.address' },
                { x: 202.4, y: 411.9, key: 'counterpartyBo2.nricOrPassport' },
                { x: 344.8, y: 411.7, key: 'counterpartyBo2.dob' },
                { x: 128.6, y: 392.7, key: 'counterpartyBo2.nationality' },
                { x: 346.7, y: 393.0, key: 'counterpartyBo2.occupation' }
            ]
        },
        checkboxes: {
            1: [
                // "Is the representative authorised to act on behalf of the UCP?" Yes/No
                { x: 193.0, y: 649.8, key: 'counterpartyEntity.authorised', match: true  },
                { x: 222.8, y: 649.7, key: 'counterpartyEntity.authorised', match: false },
                // Entity type — top row (LP / LLP / Company)
                { x: 225.0, y: 477.0, key: 'counterpartyEntity.type', match: 'LimitedPartnership' },
                { x: 318.3, y: 477.1, key: 'counterpartyEntity.type', match: 'LLP' },
                { x: 442.6, y: 476.9, key: 'counterpartyEntity.type', match: 'Company' },
                // Entity type — bottom row (Corporation / Trust / Others)
                { x:  82.8, y: 457.1, key: 'counterpartyEntity.type', match: 'Corporation' },
                { x: 150.5, y: 457.2, key: 'counterpartyEntity.type', match: 'Trust' },
                { x: 187.1, y: 457.1, key: 'counterpartyEntity.type', match: 'Others' },
                // "Are senior management personnel the beneficial owners?" Yes/No
                { x: 471.9, y: 413.8, key: 'counterpartyEntity.seniorMgmtIsBO', match: true  },
                { x: 502.3, y: 414.0, key: 'counterpartyEntity.seniorMgmtIsBO', match: false },
                // P1 ID type
                { x:  81.7, y: 328.5, key: 'counterpartyEntity.p1IdType', match: 'NRIC' },
                { x: 143.7, y: 328.4, key: 'counterpartyEntity.p1IdType', match: 'Passport' },
                { x: 191.6, y: 328.5, key: 'counterpartyEntity.p1IdType', match: 'WorkPermit' },
                { x: 253.1, y: 328.5, key: 'counterpartyEntity.p1IdType', match: 'Others' },
                // P2 ID type
                { x:  81.8, y: 235.0, key: 'counterpartyEntity.p2IdType', match: 'NRIC' },
                { x: 143.7, y: 234.9, key: 'counterpartyEntity.p2IdType', match: 'Passport' },
                { x: 191.5, y: 235.1, key: 'counterpartyEntity.p2IdType', match: 'WorkPermit' },
                { x: 253.1, y: 234.7, key: 'counterpartyEntity.p2IdType', match: 'Others' }
            ],
            2: [
                // BO1 ID type
                { x:  81.7, y: 591.4, key: 'counterpartyBo1.idType', match: 'NRIC' },
                { x: 143.6, y: 591.5, key: 'counterpartyBo1.idType', match: 'Passport' },
                { x: 191.7, y: 591.8, key: 'counterpartyBo1.idType', match: 'WorkPermit' },
                { x: 253.0, y: 591.8, key: 'counterpartyBo1.idType', match: 'Others' },
                // BO2 ID type
                { x:  81.6, y: 449.8, key: 'counterpartyBo2.idType', match: 'NRIC' },
                { x: 143.6, y: 449.7, key: 'counterpartyBo2.idType', match: 'Passport' },
                { x: 191.5, y: 449.5, key: 'counterpartyBo2.idType', match: 'WorkPermit' },
                { x: 253.1, y: 449.6, key: 'counterpartyBo2.idType', match: 'Others' }
            ]
        }
    },

    // =================================================
    // Form U4 — Particulars of Legal Person the Counterparty is Acting on Behalf Of, 2 pages
    // Parallel to Form A4 but for the counterparty side.
    // Page 1: Entity (Section 1) + Senior Management Persons 1, 2, 3 (Section 2)
    // Page 2: Beneficial Owners 1 & 2 (Section 3)
    // =================================================
    formU4: {
        pages: 2,
        text: {
            1: [
                // Section 1 — Entity details
                { x:  79.2, y: 609.0, key: 'counterpartyPrincipalEntity.name' },
                { x: 189.2, y: 586.7, key: 'counterpartyPrincipalEntity.registeredAddress' },
                { x:  76.7, y: 564.1, key: 'counterpartyPrincipalEntity.principalAddress' },
                { x: 161.4, y: 544.4, key: 'counterpartyPrincipalEntity.phone' },
                { x: 358.9, y: 545.6, key: 'counterpartyPrincipalEntity.email' },
                { x: 244.4, y: 523.4, key: 'counterpartyPrincipalEntity.uen' },
                { x: 465.4, y: 523.2, key: 'counterpartyPrincipalEntity.dateOfIncorp' },
                { x: 277.8, y: 501.5, key: 'counterpartyPrincipalEntity.country' },
                { x: 174.4, y: 482.8, key: 'counterpartyPrincipalEntity.mainBusiness' },
                { x: 280.8, y: 442.3, key: 'counterpartyPrincipalEntity.typeOthersDetail' },
                // Section 2 — Senior Management Person 1
                { x: 179.6, y: 379.1, key: 'counterpartyPrincipalEntity.p1Designation' },
                { x: 225.0, y: 360.4, key: 'counterpartyPrincipalEntity.p1Name' },
                { x: 344.0, y: 323.4, key: 'counterpartyPrincipalEntity.p1IdOthersDetail' },
                { x: 201.3, y: 304.9, key: 'counterpartyPrincipalEntity.p1Nric' },
                { x: 346.7, y: 304.2, key: 'counterpartyPrincipalEntity.p1Nationality' },
                // Section 2 — Senior Management Person 2
                { x: 179.6, y: 285.5, key: 'counterpartyPrincipalEntity.p2Designation' },
                { x: 225.0, y: 266.8, key: 'counterpartyPrincipalEntity.p2Name' },
                { x: 344.0, y: 229.8, key: 'counterpartyPrincipalEntity.p2IdOthersDetail' },
                { x: 203.2, y: 210.7, key: 'counterpartyPrincipalEntity.p2Nric' },
                { x: 346.7, y: 210.6, key: 'counterpartyPrincipalEntity.p2Nationality' },
                // Section 2 — Senior Management Person 3
                { x: 179.6, y: 191.9, key: 'counterpartyPrincipalEntity.p3Designation' },
                { x: 225.0, y: 173.2, key: 'counterpartyPrincipalEntity.p3Name' },
                { x: 344.0, y: 136.2, key: 'counterpartyPrincipalEntity.p3IdOthersDetail' },
                { x: 203.2, y: 117.3, key: 'counterpartyPrincipalEntity.p3Nric' },
                { x: 346.7, y: 117.0, key: 'counterpartyPrincipalEntity.p3Nationality' }
            ],
            2: [
                // Section 3 — Beneficial Owner 1
                { x: 225.2, y: 627.2, key: 'counterpartyPrincipalBo1.fullName' },
                { x: 344.3, y: 589.8, key: 'counterpartyPrincipalBo1.idOthersDetail' },
                { x: 166.0, y: 570.8, key: 'counterpartyPrincipalBo1.address' },
                { x: 202.0, y: 552.1, key: 'counterpartyPrincipalBo1.nricOrPassport' },
                { x: 344.8, y: 552.4, key: 'counterpartyPrincipalBo1.dob' },
                { x: 129.1, y: 531.7, key: 'counterpartyPrincipalBo1.nationality' },
                { x: 346.7, y: 533.6, key: 'counterpartyPrincipalBo1.occupation' },
                // Section 3 — Beneficial Owner 2
                { x: 225.0, y: 495.7, key: 'counterpartyPrincipalBo2.fullName' },
                { x: 344.0, y: 458.8, key: 'counterpartyPrincipalBo2.idOthersDetail' },
                { x: 166.0, y: 439.8, key: 'counterpartyPrincipalBo2.address' },
                { x: 204.6, y: 419.8, key: 'counterpartyPrincipalBo2.nricOrPassport' },
                { x: 344.8, y: 420.8, key: 'counterpartyPrincipalBo2.dob' },
                { x: 129.1, y: 402.9, key: 'counterpartyPrincipalBo2.nationality' },
                { x: 346.9, y: 402.6, key: 'counterpartyPrincipalBo2.occupation' }
            ]
        },
        checkboxes: {
            1: [
                // "Is the UCP authorised to act on behalf of the Legal Person?" Yes/No
                { x: 332.5, y: 667.8, key: 'counterpartyPrincipalEntity.authorised', match: true  },
                { x: 364.6, y: 668.0, key: 'counterpartyPrincipalEntity.authorised', match: false },
                // Entity type — top row (LP / LLP / Company)
                { x: 225.0, y: 463.8, key: 'counterpartyPrincipalEntity.type', match: 'LimitedPartnership' },
                { x: 318.4, y: 463.5, key: 'counterpartyPrincipalEntity.type', match: 'LLP' },
                { x: 442.4, y: 463.3, key: 'counterpartyPrincipalEntity.type', match: 'Company' },
                // Entity type — bottom row (Corp / Trust / Others)
                { x:  83.2, y: 443.0, key: 'counterpartyPrincipalEntity.type', match: 'Corporation' },
                { x: 147.9, y: 443.3, key: 'counterpartyPrincipalEntity.type', match: 'Trust' },
                { x: 184.6, y: 443.1, key: 'counterpartyPrincipalEntity.type', match: 'Others' },
                // Person 1 ID type
                { x:  81.5, y: 323.3, key: 'counterpartyPrincipalEntity.p1IdType', match: 'NRIC' },
                { x: 143.7, y: 323.4, key: 'counterpartyPrincipalEntity.p1IdType', match: 'Passport' },
                { x: 191.8, y: 323.4, key: 'counterpartyPrincipalEntity.p1IdType', match: 'WorkPermit' },
                { x: 253.1, y: 323.1, key: 'counterpartyPrincipalEntity.p1IdType', match: 'Others' },
                // Person 2 ID type
                { x:  81.6, y: 229.8, key: 'counterpartyPrincipalEntity.p2IdType', match: 'NRIC' },
                { x: 143.6, y: 229.5, key: 'counterpartyPrincipalEntity.p2IdType', match: 'Passport' },
                { x: 191.9, y: 230.2, key: 'counterpartyPrincipalEntity.p2IdType', match: 'WorkPermit' },
                { x: 253.3, y: 229.8, key: 'counterpartyPrincipalEntity.p2IdType', match: 'Others' },
                // Person 3 ID type
                { x:  81.6, y: 136.1, key: 'counterpartyPrincipalEntity.p3IdType', match: 'NRIC' },
                { x: 143.7, y: 136.2, key: 'counterpartyPrincipalEntity.p3IdType', match: 'Passport' },
                { x: 191.9, y: 136.0, key: 'counterpartyPrincipalEntity.p3IdType', match: 'WorkPermit' },
                { x: 253.0, y: 136.0, key: 'counterpartyPrincipalEntity.p3IdType', match: 'Others' }
            ],
            2: [
                // BO1 ID type
                { x:  81.6, y: 590.3, key: 'counterpartyPrincipalBo1.idType', match: 'NRIC' },
                { x: 143.6, y: 590.5, key: 'counterpartyPrincipalBo1.idType', match: 'Passport' },
                { x: 191.5, y: 590.2, key: 'counterpartyPrincipalBo1.idType', match: 'WorkPermit' },
                { x: 253.0, y: 590.3, key: 'counterpartyPrincipalBo1.idType', match: 'Others' },
                // BO2 ID type
                { x:  81.9, y: 459.1, key: 'counterpartyPrincipalBo2.idType', match: 'NRIC' },
                { x: 143.6, y: 458.9, key: 'counterpartyPrincipalBo2.idType', match: 'Passport' },
                { x: 191.6, y: 458.8, key: 'counterpartyPrincipalBo2.idType', match: 'WorkPermit' },
                { x: 253.0, y: 459.3, key: 'counterpartyPrincipalBo2.idType', match: 'Others' }
            ]
        }
    },

    // =================================================
    // Form C — Enhanced Customer Due Diligence (Client side), 2 pages
    // Triggered when Form B screening flags higher risk.
    // Page 1: Name+ID + Section A (transaction) + Section B (source of funds) + Section C (source of wealth)
    // Page 2: Section D (RES Recommendation)
    // =================================================
    formC: {
        pages: 2,
        text: {
            1: [
                { x: 126.6, y: 679.8, key: 'client.fullName' },
                { x: 416.8, y: 679.8, key: 'client.nricOrPassport' },
                { x: 180.9, y: 637.1, key: 'propertyAddress' },
                { x: 191.5, y: 615.1, key: 'formC.purchasePrice' },
                { x: 413.6, y: 615.1, key: 'formC.monthlyRental' },
                { x: 435.0, y: 592.0, key: 'formC.purposeOthersDetail' },
                { x: 326.0, y: 569.6, key: 'formC.transactionAmount' },          // T7 (was unsure but Section B header)
                { x: 114.9, y: 547.7, key: 'formC.transactionAmount' },          // Total Transaction Amount S$
                { x: 426.6, y: 545.2, key: 'formC.bankStatementMonths' },        // months
                { x: 208.4, y: 474.6, key: 'formC.fundLoanInstitution' },        // Loan: Bank/Institution
                { x: 362.9, y: 461.5, key: 'formC.fundSupportingDocsOthersDetail' },
                { x: 210.8, y: 436.9, key: 'formC.fundSourcesOthersDetail' },
                { x: 114.2, y: 392.6, key: 'formC.wealthNetWorth' },
                { x: 150.0, y: 358.4, key: 'formC.wealthBusinessName' },
                { x: 196.5, y: 333.7, key: 'formC.wealthInvestmentType' },
                { x: 361.9, y: 329.0, key: 'formC.wealthSupportingDocsOthersDetail' },
                { x: 213.8, y: 296.6, key: 'formC.wealthSourcesOthersDetail' }
            ],
            2: [
                { x: 217.7, y: 622.0, key: 'formC.highRiskBasis',  maxWidth: 290, size: 8, lineHeight: 11 },
                { x: 271.0, y: 567.0, key: 'formC.proceedReasons', maxWidth: 240, size: 8, lineHeight: 11 }
            ]
        },
        checkboxes: {
            1: [
                // Purpose of transaction
                { x: 208.1, y: 593.5, key: 'formC.purpose', match: 'OwnStay' },
                { x: 265.0, y: 593.1, key: 'formC.purpose', match: 'Investment' },
                { x: 324.3, y: 592.9, key: 'formC.purpose', match: 'Others' },
                // Source of funds (multi-select array)
                { x: 103.2, y: 525.4, key: 'formC.fundSources', match: 'PersonalSavings' },
                { x: 103.2, y: 513.0, key: 'formC.fundSources', match: 'SaleOfProperty' },
                { x: 103.3, y: 500.7, key: 'formC.fundSources', match: 'BusinessIncome' },
                { x: 103.1, y: 487.9, key: 'formC.fundSources', match: 'InvestmentReturns' },
                { x: 102.9, y: 475.3, key: 'formC.fundSources', match: 'Loan' },
                { x: 103.2, y: 463.2, key: 'formC.fundSources', match: 'CPFFunds' },
                { x: 103.0, y: 450.0, key: 'formC.fundSources', match: 'GiftInheritance' },
                { x: 103.0, y: 437.8, key: 'formC.fundSources', match: 'Others' },
                // Supporting docs for funds (multi-select array)
                { x: 320.0, y: 547.2, key: 'formC.fundSupportingDocs', match: 'BankStatements' },
                { x: 319.2, y: 534.6, key: 'formC.fundSupportingDocs', match: 'CPFStatement' },
                { x: 319.5, y: 522.6, key: 'formC.fundSupportingDocs', match: 'SalePurchaseAgreement' },
                { x: 319.4, y: 498.7, key: 'formC.fundSupportingDocs', match: 'LoanApprovalLetter' },
                { x: 319.2, y: 486.4, key: 'formC.fundSupportingDocs', match: 'InvestmentPortfolio' },
                { x: 319.5, y: 474.1, key: 'formC.fundSupportingDocs', match: 'GiftDeed' },
                { x: 319.2, y: 461.5, key: 'formC.fundSupportingDocs', match: 'Others' },
                // Source of wealth (multi-select)
                { x: 103.2, y: 370.7, key: 'formC.wealthSources', match: 'BusinessOwnership' },
                { x: 103.0, y: 347.4, key: 'formC.wealthSources', match: 'EmploymentIncome' },
                { x: 103.1, y: 334.6, key: 'formC.wealthSources', match: 'Investments' },
                { x: 103.3, y: 321.8, key: 'formC.wealthSources', match: 'Inheritance' },
                { x: 103.6, y: 309.6, key: 'formC.wealthSources', match: 'PropertyPortfolio' },
                { x: 103.5, y: 297.0, key: 'formC.wealthSources', match: 'Others' },
                // Supporting docs for wealth (multi-select)
                { x: 319.5, y: 391.8, key: 'formC.wealthSupportingDocs', match: 'CompanyFinancialStatements' },
                { x: 319.9, y: 379.6, key: 'formC.wealthSupportingDocs', match: 'EmploymentLetter' },
                { x: 319.4, y: 366.8, key: 'formC.wealthSupportingDocs', match: 'TaxReturns' },
                { x: 319.4, y: 354.5, key: 'formC.wealthSupportingDocs', match: 'InvestmentCertificates' },
                { x: 319.4, y: 342.0, key: 'formC.wealthSupportingDocs', match: 'PropertyOwnership' },
                { x: 319.0, y: 329.7, key: 'formC.wealthSupportingDocs', match: 'Others' }
            ],
            2: [
                // RES Recommendation
                { x: 102.7, y: 575.1, key: 'formC.recommendation', match: 'Proceed' },
                { x: 242.8, y: 575.3, key: 'formC.recommendation', match: 'NotProceed' }
            ]
        }
    },

    // =================================================
    // Form U6 — Enhanced Due Diligence on Unrepresented Counterparty, 2 pages
    // Same Section A/B/C/D structure as Form C, but for counterparty side.
    // Page 1: Section A (transaction) + Section B (funds) + Section C (wealth)
    // Page 2: Section D (RES Recommendation)
    // =================================================
    formU6: {
        pages: 2,
        text: {
            1: [
                { x: 180.1, y: 668.0, key: 'propertyAddress' },
                { x: 190.8, y: 645.7, key: 'formU6.purchasePrice' },
                { x: 413.4, y: 644.6, key: 'formU6.monthlyRental' },
                { x: 427.0, y: 624.3, key: 'formU6.purposeOthersDetail' },
                // Section B/C value rects in U6 are ~7-10pt tall — use size 8 + lower
                // baseline so values sit cleanly above the underline without overlapping
                // the italic label above.
                { x: 115.2, y: 578.0, key: 'formU6.transactionAmount', size: 8 },
                { x: 426.6, y: 574.5, key: 'formU6.bankStatementMonths', size: 8 },
                { x: 208.9, y: 502.5, key: 'formU6.fundLoanInstitution', size: 8 },
                { x: 361.6, y: 488.5, key: 'formU6.fundSupportingDocsOthersDetail', size: 8 },
                { x: 208.2, y: 467.0, key: 'formU6.fundSourcesOthersDetail', size: 8 },
                { x: 115.2, y: 421.0, key: 'formU6.wealthNetWorth', size: 8 },
                { x: 149.4, y: 387.0, key: 'formU6.wealthBusinessName', size: 8 },
                { x: 197.2, y: 363.0, key: 'formU6.wealthInvestmentType', size: 8 },
                { x: 361.3, y: 357.5, key: 'formU6.wealthSupportingDocsOthersDetail', size: 8 },
                { x: 215.0, y: 326.0, key: 'formU6.wealthSourcesOthersDetail', size: 8 }
            ],
            2: [
                { x: 217.0, y: 622.0, key: 'formU6.highRiskBasis',  maxWidth: 290, size: 8, lineHeight: 11 },
                { x: 312.6, y: 567.0, key: 'formU6.proceedReasons', maxWidth: 200, size: 8, lineHeight: 11 }
            ]
        },
        checkboxes: {
            1: [
                // Purpose of transaction
                { x: 208.2, y: 624.5, key: 'formU6.purpose', match: 'OwnStay' },
                { x: 259.7, y: 623.8, key: 'formU6.purpose', match: 'Investment' },
                { x: 316.7, y: 624.5, key: 'formU6.purpose', match: 'Others' },
                // Source of funds (multi-select)
                { x: 102.7, y: 556.0, key: 'formU6.fundSources', match: 'PersonalSavings' },
                { x: 102.9, y: 544.2, key: 'formU6.fundSources', match: 'SaleOfProperty' },
                { x: 103.3, y: 531.6, key: 'formU6.fundSources', match: 'BusinessIncome' },
                { x: 103.3, y: 518.8, key: 'formU6.fundSources', match: 'InvestmentReturns' },
                { x: 103.0, y: 506.4, key: 'formU6.fundSources', match: 'Loan' },
                { x: 103.1, y: 493.9, key: 'formU6.fundSources', match: 'CPFFunds' },
                { x: 103.4, y: 481.7, key: 'formU6.fundSources', match: 'GiftInheritance' },
                { x: 102.9, y: 469.0, key: 'formU6.fundSources', match: 'Others' },
                // Supporting docs for funds (multi-select)
                { x: 319.1, y: 578.1, key: 'formU6.fundSupportingDocs', match: 'BankStatements' },
                { x: 319.4, y: 565.7, key: 'formU6.fundSupportingDocs', match: 'CPFStatement' },
                { x: 319.3, y: 552.8, key: 'formU6.fundSupportingDocs', match: 'SalePurchaseAgreement' },
                { x: 319.2, y: 529.9, key: 'formU6.fundSupportingDocs', match: 'LoanApprovalLetter' },
                { x: 319.2, y: 517.4, key: 'formU6.fundSupportingDocs', match: 'InvestmentPortfolio' },
                { x: 319.6, y: 504.6, key: 'formU6.fundSupportingDocs', match: 'GiftDeed' },
                { x: 319.4, y: 492.4, key: 'formU6.fundSupportingDocs', match: 'Others' },
                // Source of wealth (multi-select)
                { x: 103.3, y: 401.6, key: 'formU6.wealthSources', match: 'BusinessOwnership' },
                { x: 103.1, y: 378.2, key: 'formU6.wealthSources', match: 'EmploymentIncome' },
                { x: 103.2, y: 365.5, key: 'formU6.wealthSources', match: 'Investments' },
                { x: 103.6, y: 353.5, key: 'formU6.wealthSources', match: 'Inheritance' },
                { x: 103.2, y: 340.7, key: 'formU6.wealthSources', match: 'PropertyPortfolio' },
                { x: 102.9, y: 327.8, key: 'formU6.wealthSources', match: 'Others' },
                // Supporting docs for wealth (multi-select)
                { x: 319.6, y: 422.7, key: 'formU6.wealthSupportingDocs', match: 'CompanyFinancialStatements' },
                { x: 319.3, y: 410.2, key: 'formU6.wealthSupportingDocs', match: 'EmploymentLetter' },
                { x: 319.6, y: 397.7, key: 'formU6.wealthSupportingDocs', match: 'TaxReturns' },
                { x: 319.5, y: 385.2, key: 'formU6.wealthSupportingDocs', match: 'InvestmentCertificates' },
                { x: 319.4, y: 372.9, key: 'formU6.wealthSupportingDocs', match: 'PropertyOwnership' },
                { x: 319.6, y: 360.6, key: 'formU6.wealthSupportingDocs', match: 'Others' }
            ],
            2: [
                // RES Recommendation
                { x: 103.4, y: 577.5, key: 'formU6.recommendation', match: 'Proceed' },
                { x: 243.0, y: 577.3, key: 'formU6.recommendation', match: 'NotProceed' }
            ]
        }
    },

    // =================================================
    // Form D — Ongoing Due Diligence (periodic review of existing clients), 2 pages
    // =================================================
    formD: {
        pages: 2,
        text: {
            1: [
                // Section A — Client info (Individual + Entity columns)
                { x: 154.7, y: 668.0, key: 'client.fullName' },
                { x: 424.0, y: 668.0, key: 'entity.name' },
                { x: 213.7, y: 648.8, key: 'client.nricOrPassport' },
                { x: 407.4, y: 648.8, key: 'entity.uen' },
                { x: 244.0, y: 632.0, key: 'formD.individualBOs', maxWidth: 115, size: 8, lineHeight: 11 },
                { x: 455.4, y: 632.0, key: 'formD.entityBOs',     maxWidth: 75,  size: 8, lineHeight: 11 },
                // Section B — Business relationship
                { x: 196.0, y: 555.7, key: 'formD.relationshipNature' },
                { x: 234.4, y: 538.1, key: 'formD.relationshipDate' },
                { x: 453.8, y: 537.4, key: 'formD.transactionFrequency' },
                // Section C — Risk assessment
                { x: 373.8, y: 488.8, key: 'formD.reviewFrequency' },
                { x: 374.0, y: 458.5, key: 'formD.lastReviewDate' },
                { x: 374.5, y: 431.7, key: 'formD.nextReviewDue' },
                { x:  97.6, y: 487.0, key: 'formD.riskLevelReasons', maxWidth: 264, size: 8, lineHeight: 22 },
                // Section D — Ongoing monitoring (1: Information Currency Check)
                { x: 102.8, y: 242.1, key: 'formD.changeOthersDetail' },
                // Section D — (2: Transaction Monitoring)
                { x: 103.6, y: 118.3, key: 'formD.unusualPatterns' },
                { x: 104.0,  y:  88.5, key: 'formD.actionsTaken' }
            ],
            2: [
                { x: 153.2, y: 663.9, key: 'resName' },
                { x: 395.1, y: 663.7, key: 'resReg' },
                { x: 370.5, y: 604.3, key: 'dateOfForm' },
                { x: 170.3, y: 586.9, key: 'estateAgentName' }
            ]
        },
        checkboxes: {
            1: [
                // Information currency: Yes/No
                { x: 417.9, y: 373.8, key: 'formD.docsCurrent', match: 'Yes' },
                { x: 456.9, y: 373.9, key: 'formD.docsCurrent', match: 'No' },
                // Changed details (multi-select array)
                { x: 103.0, y: 335.0, key: 'formD.changedDetails', match: 'IDDocuments' },
                { x: 102.8, y: 315.1, key: 'formD.changedDetails', match: 'ResidentialAddress' },
                { x: 102.7, y: 295.5, key: 'formD.changedDetails', match: 'BeneficialOwners' },
                { x: 102.9, y: 275.4, key: 'formD.changedDetails', match: 'SourceOfFunds' },
                { x: 103.2, y: 255.5, key: 'formD.changedDetails', match: 'Others' },
                // Action: copy obtained
                { x: 103.1, y: 206.0, key: 'formD.copyObtained', match: true }
            ],
            2: [
                { x: 103.2, y: 626.7, key: 'formD.transactionsConsistent', match: 'Yes' },
                { x: 103.0, y: 606.5, key: 'formD.transactionsConsistent', match: 'No' }
            ]
        }
    },

    // =================================================
    // Form U3 — Particulars of Individual the Counterparty is Acting on Behalf Of, 1 page
    // Parallel to Form A3 but for the counterparty side.
    // =================================================
    formU3: {
        pages: 1,
        text: {
            1: [
                { x:  80.4, y: 648.8, key: 'counterpartyPrincipal.fullName' },
                { x: 344.0, y: 611.9, key: 'counterpartyPrincipal.idOthersDetail' },
                { x: 166.4, y: 574.7, key: 'counterpartyPrincipal.address' },
                { x: 202.6, y: 536.9, key: 'counterpartyPrincipal.nricOrPassport' },
                { x: 345.2, y: 537.5, key: 'counterpartyPrincipal.dob' },
                { x: 129.0, y: 499.8, key: 'counterpartyPrincipal.nationality' },
                { x: 346.9, y: 500.5, key: 'counterpartyPrincipal.occupation' }
            ]
        },
        checkboxes: {
            1: [
                // "Is the UCP authorised to act on behalf of the Individual?"
                { x: 319.4, y: 689.7, key: 'counterpartyPrincipal.clientAuthorised', match: 'Yes' },
                { x: 349.1, y: 689.6, key: 'counterpartyPrincipal.clientAuthorised', match: 'No'  },
                // ID type
                { x:  80.8, y: 612.0, key: 'counterpartyPrincipal.idType', match: 'NRIC' },
                { x: 143.6, y: 612.0, key: 'counterpartyPrincipal.idType', match: 'Passport' },
                { x: 191.6, y: 612.3, key: 'counterpartyPrincipal.idType', match: 'WorkPermit' },
                { x: 253.3, y: 612.5, key: 'counterpartyPrincipal.idType', match: 'Others' }
            ]
        }
    }
};

// =====================================================
// Build the flat field-data object from the wizard's formData.
// All keys here must match the keys referenced in AML_FORM_COORDS above.
// =====================================================
window.buildAmlFieldData = function(formData, formId) {
    const isRental = formData.transactionType === 'Rental';
    const toRole = {
        'Seller/Landlord': isRental ? 'Landlord' : 'Seller',
        'Buyer/Tenant':    isRental ? 'Tenant'   : 'Buyer'
    };
    const flipRole = {
        'Seller/Landlord': isRental ? 'Tenant'   : 'Buyer',
        'Buyer/Tenant':    isRental ? 'Landlord' : 'Seller'
    };

    const baseForm = (formId || '').replace(/_.*$/, '');
    const isCounterpartyForm = /^formU/.test(baseForm);
    const repRole = isCounterpartyForm ? flipRole[formData.role] : toRole[formData.role];

    // Property kind for the AML form checkbox row.
    // IMPORTANT: we use `formData.propertyCategory` which is asked explicitly
    // in Step 5 (HDB / Condo / Landed / Others). DO NOT infer this from
    // `formData.propertyType` — "Private" can be Condo, Landed, or other.
    // Per William's rule: never assume property sub-type.
    const propertyKind = formData.propertyCategory || '';

    // Acting capacity flags (three vertical boxes on A1 and U1)
    const principalIsEntity = formData.principalType === 'Entity';
    const clientActingSelf        = !formData.clientActingOnBehalf;
    const clientActingIndividual  =  formData.clientActingOnBehalf && !principalIsEntity;
    const clientActingCorporate   =  formData.clientActingOnBehalf &&  principalIsEntity;

    const counterPrincipalIsEntity  = formData.counterpartyPrincipalType === 'Entity';
    const counterActingSelf         = !formData.counterpartyActingOnBehalf;
    const counterActingIndividual   =  formData.counterpartyActingOnBehalf && !counterPrincipalIsEntity;
    const counterActingCorporate    =  formData.counterpartyActingOnBehalf &&  counterPrincipalIsEntity;

    // Women's Charter Checklist — citizenship-aware filling:
    //   - Rows 1-3 (SC/PR) fill YES only if checks done AND at least one tenant is SC/PR
    //   - Rows 4-6 (Foreigner) fill YES only if checks done AND at least one tenant is a foreigner
    const wcChecked = !!formData.wcAllChecksDone;
    const wcCit     = formData.wcCitizenship || '';  // 'SCPR' | 'Foreigner' | 'Mixed' | ''
    const wcAnswerSCPR    = (wcChecked && (wcCit === 'SCPR' || wcCit === 'Mixed')) ? 'YES' : '';
    const wcAnswerForeign = (wcChecked && (wcCit === 'Foreigner' || wcCit === 'Mixed')) ? 'YES' : '';

    // Role-aware fill for page 2 signature/acknowledgement blocks.
    // William fills only the column matching his rep role; the other column is left blank.
    const sriAgency  = 'SRI PTE LTD';
    const todayDate  = formData.agreementDate || new Date().toLocaleDateString('en-GB');
    const repsLandlord = (formData.role === 'Seller/Landlord');
    const repsTenant   = (formData.role === 'Buyer/Tenant');
    // Landlord / Tenant names — client is the side William represents.
    const wcLandlordName = repsLandlord ? (formData.clientName || '') : (formData.counterpartyName || '');
    const wcTenantName   = repsTenant   ? (formData.clientName || '') : (formData.counterpartyName || '');

    // Form B defaults — every Section 1 (PEP/sanctions) and Section 2
    // (red flag) answer defaults to 'No'. William can override individual
    // answers in a future Step 5 sub-block; for now this matches what he'd
    // tick manually for a clean transaction.
    const formBDefaults = {
        s1: ['No', 'No', 'No', 'No', 'No', 'No'],   // 6 PEP/sanctions Qs (Q6 may also be 'NA')
        s2: Array(29).fill('No'),                    // 29 red flag indicators
        riskReason: ''                                // Filled only when any answer is Yes
    };
    const formBOverrides = formData.formB || {};
    // Only honour user overrides when William has explicitly tapped "show exceptions".
    // If unchecked (default), fall back to all-No. This means flipping the toggle off
    // is a clean reset — answers chosen earlier no longer leak into the PDF.
    const formB = formBOverrides.showExceptions ? {
        s1: (formBOverrides.s1 && formBOverrides.s1.length === 6) ? formBOverrides.s1 : formBDefaults.s1,
        s2: (formBOverrides.s2 && formBOverrides.s2.length === 29) ? formBOverrides.s2 : formBDefaults.s2,
        riskReason: formBOverrides.riskReason || formBDefaults.riskReason
    } : formBDefaults;

    // Form A4 — defaults
    // "Is the Client authorised to act on behalf of the Legal Person?" — default Yes
    // (William will only generate Form A4 when there is proper authorisation in place)
    const formA4 = {
        clientAuthorised: (formData.formA4 && formData.formA4.clientAuthorised) || 'Yes'
    };

    // Form U5 — same shape as Form B, but for the unrepresented counterparty side.
    // Defaults to all-No; only honoured when William taps the "show exceptions" toggle.
    const formU5Defaults = {
        s1: ['No', 'No', 'No', 'No', 'No', 'No'],
        s2: Array(29).fill('No'),
        riskReason: ''
    };
    const formU5Overrides = formData.formU5 || {};
    const formU5 = formU5Overrides.showExceptions ? {
        s1: (formU5Overrides.s1 && formU5Overrides.s1.length === 6) ? formU5Overrides.s1 : formU5Defaults.s1,
        s2: (formU5Overrides.s2 && formU5Overrides.s2.length === 29) ? formU5Overrides.s2 : formU5Defaults.s2,
        riskReason: formU5Overrides.riskReason || formU5Defaults.riskReason
    } : formU5Defaults;

    // Form C / Form U6 — Enhanced Due Diligence (source of funds + source of wealth + recommendation)
    // Identical structure; one is for client (C), one for counterparty (U6).
    const buildEcddBlock = (override) => override || {};
    const formC  = buildEcddBlock(formData.formC);
    const formU6 = buildEcddBlock(formData.formU6);

    // Form D — Ongoing Due Diligence (periodic review)
    const formD = formData.formD || {};

    return {
        resName:    (formData.agentName || '').toString(),
        resReg:     (formData.ceaRegistration || '').toString(),
        estateAgentName: 'SRI PTE LTD',
        dateOfForm: todayDate,
        propertyAddress: formData.propertyAddress || '',
        propertyKind: propertyKind,
        repRole: repRole,
        formB: formB,
        formA4: formA4,
        formU5: formU5,
        formC:  formC,
        formU6: formU6,
        formD:  formD,
        // Women's Charter Checklist fields
        leaseStart: formData.leaseStartDate || '',
        leaseEnd:   formData.leaseEndDate || '',
        wcAnswerSCPR:    wcAnswerSCPR,
        wcAnswerForeign: wcAnswerForeign,
        // RES signature — fill only the relevant column
        wcLeftResName:  repsLandlord ? (formData.agentName || '') : '',
        wcLeftResReg:   repsLandlord ? (formData.ceaRegistration || '') : '',
        wcLeftResEA:    repsLandlord ? sriAgency : '',
        wcLeftResDate:  repsLandlord ? todayDate : '',
        wcRightResName: repsTenant ? (formData.agentName || '') : '',
        wcRightResReg:  repsTenant ? (formData.ceaRegistration || '') : '',
        wcRightResEA:   repsTenant ? sriAgency : '',
        wcRightResDate: repsTenant ? todayDate : '',
        // Landlord + Tenant acknowledgement names
        wcLandlordName: wcLandlordName,
        wcTenantName:   wcTenantName,

        client: {
            fullName:       formData.clientName || '',
            nricOrPassport: formData.clientNRIC || '',
            dob:            formData.clientDOB || '',
            address:        formData.clientAddress || '',
            nationality:    formData.clientNationality || '',
            occupation:     formData.clientOccupation || '',
            idType:         formData.clientIdType || 'NRIC',
            actingForSelf:            clientActingSelf,
            actingOnBehalfIndividual: clientActingIndividual,
            actingOnBehalfCorporate:  clientActingCorporate
        },

        entity: {
            name:                formData.entityName || '',
            uen:                 formData.entityUen || '',
            dateOfIncorp:        formData.entityDateOfIncorp || '',
            country:             formData.entityCountry || 'Singapore',
            registeredAddress:   formData.entityAddress || '',
            principalAddress:    formData.entityPrincipalAddress || '',
            phone:               formData.entityPhone || '',
            email:               formData.entityEmail || '',
            mainBusiness:        formData.entityMainBusiness || '',
            type:                formData.entityType || 'Company',
            typeOthersDetail:    formData.entityTypeOthersDetail || '',
            authorised:          formData.entityAuthorised !== false,
            authLetterRef:       formData.entityAuthLetterRef || '',
            seniorMgmtIsBO:      !!formData.entitySeniorMgmtIsBO,
            p1Designation:       formData.entityP1Designation || '',
            p1Name:              formData.entityP1Name || '',
            p1Nric:              formData.entityP1Nric || '',
            p1Nationality:       formData.entityP1Nationality || '',
            p1IdType:            formData.entityP1IdType || 'NRIC',
            p1IdOthersDetail:    formData.entityP1IdOthersDetail || '',
            p2Designation:       formData.entityP2Designation || '',
            p2Name:              formData.entityP2Name || '',
            p2Nric:              formData.entityP2Nric || '',
            p2Nationality:       formData.entityP2Nationality || '',
            p2IdType:            formData.entityP2IdType || 'NRIC',
            p2IdOthersDetail:    formData.entityP2IdOthersDetail || ''
        },

        bo1: {
            fullName:        formData.bo1Name || '',
            nricOrPassport:  formData.bo1Nric || '',
            dob:             formData.bo1Dob || '',
            address:         formData.bo1Address || '',
            nationality:     formData.bo1Nationality || '',
            occupation:      formData.bo1Occupation || '',
            idType:          formData.bo1IdType || 'NRIC',
            idOthersDetail:  formData.bo1IdOthersDetail || ''
        },

        bo2: {
            fullName:        formData.bo2Name || '',
            nricOrPassport:  formData.bo2Nric || '',
            dob:             formData.bo2Dob || '',
            address:         formData.bo2Address || '',
            nationality:     formData.bo2Nationality || '',
            occupation:      formData.bo2Occupation || '',
            idType:          formData.bo2IdType || 'NRIC',
            idOthersDetail:  formData.bo2IdOthersDetail || ''
        },

        principal: {
            fullName:         formData.principalName || '',
            nricOrPassport:   formData.principalNric || '',
            dob:              formData.principalDob || '',
            address:          formData.principalAddress || '',
            nationality:      formData.principalNationality || '',
            occupation:       formData.principalOccupation || '',
            idType:           formData.principalIdType || 'NRIC',
            idOthersDetail:   formData.principalIdOthersDetail || '',
            clientAuthorised: formData.principalClientAuthorised !== false
        },

        counterparty: {
            fullName:        formData.counterpartyName || '',
            nricOrPassport:  formData.counterpartyNRIC || '',
            dob:             formData.counterpartyDob || '',
            address:         formData.counterpartyAddress || '',
            nationality:     formData.counterpartyNationality || '',
            occupation:      formData.counterpartyOccupation || '',
            idType:          formData.counterpartyIdType || 'NRIC',
            idOthersDetail:  formData.counterpartyIdOthersDetail || '',
            propertyOthersDetail: formData.counterpartyPropertyOthersDetail || '',
            role:            flipRole[formData.role],
            actingForSelf:            counterActingSelf,
            actingOnBehalfIndividual: counterActingIndividual,
            actingOnBehalfCorporate:  counterActingCorporate
        },

        // Person the counterparty is acting on behalf of (Form U3, Form U2 BO of acting entity, etc.)
        counterpartyPrincipal: {
            fullName:         formData.counterpartyPrincipalName || '',
            nricOrPassport:   formData.counterpartyPrincipalNric || '',
            dob:              formData.counterpartyPrincipalDob || '',
            address:          formData.counterpartyPrincipalAddress || '',
            nationality:      formData.counterpartyPrincipalNationality || '',
            occupation:       formData.counterpartyPrincipalOccupation || '',
            idType:           formData.counterpartyPrincipalIdType || 'NRIC',
            idOthersDetail:   formData.counterpartyPrincipalIdOthersDetail || '',
            // Default Yes — William only generates U3 when authorisation is in place
            clientAuthorised: formData.counterpartyPrincipalAuthorised || 'Yes'
        },

        // Counterparty entity (Form U2). Mirrors `entity` block but for the other side.
        counterpartyEntity: {
            name:                formData.counterpartyEntityName || '',
            uen:                 formData.counterpartyEntityUen || '',
            dateOfIncorp:        formData.counterpartyEntityDateOfIncorp || '',
            country:             formData.counterpartyEntityCountry || 'Singapore',
            registeredAddress:   formData.counterpartyEntityAddress || '',
            principalAddress:    formData.counterpartyEntityPrincipalAddress || '',
            phone:               formData.counterpartyEntityPhone || '',
            email:               formData.counterpartyEntityEmail || '',
            mainBusiness:        formData.counterpartyEntityMainBusiness || '',
            type:                formData.counterpartyEntityType || 'Company',
            typeOthersDetail:    formData.counterpartyEntityTypeOthersDetail || '',
            authorised:          formData.counterpartyEntityAuthorised !== false,
            seniorMgmtIsBO:      !!formData.counterpartyEntitySeniorMgmtIsBO,
            p1Designation:       formData.counterpartyEntityP1Designation || '',
            p1Name:              formData.counterpartyEntityP1Name || '',
            p1Nric:              formData.counterpartyEntityP1Nric || '',
            p1Nationality:       formData.counterpartyEntityP1Nationality || '',
            p1IdType:            formData.counterpartyEntityP1IdType || 'NRIC',
            p1IdOthersDetail:    formData.counterpartyEntityP1IdOthersDetail || '',
            p2Designation:       formData.counterpartyEntityP2Designation || '',
            p2Name:              formData.counterpartyEntityP2Name || '',
            p2Nric:              formData.counterpartyEntityP2Nric || '',
            p2Nationality:       formData.counterpartyEntityP2Nationality || '',
            p2IdType:            formData.counterpartyEntityP2IdType || 'NRIC',
            p2IdOthersDetail:    formData.counterpartyEntityP2IdOthersDetail || ''
        },

        // Beneficial owners of the counterparty entity (Form U2 page 2)
        counterpartyBo1: {
            fullName:        formData.counterpartyBo1Name || '',
            nricOrPassport:  formData.counterpartyBo1Nric || '',
            dob:             formData.counterpartyBo1Dob || '',
            address:         formData.counterpartyBo1Address || '',
            nationality:     formData.counterpartyBo1Nationality || '',
            occupation:      formData.counterpartyBo1Occupation || '',
            idType:          formData.counterpartyBo1IdType || 'NRIC',
            idOthersDetail:  formData.counterpartyBo1IdOthersDetail || ''
        },
        counterpartyBo2: {
            fullName:        formData.counterpartyBo2Name || '',
            nricOrPassport:  formData.counterpartyBo2Nric || '',
            dob:             formData.counterpartyBo2Dob || '',
            address:         formData.counterpartyBo2Address || '',
            nationality:     formData.counterpartyBo2Nationality || '',
            occupation:      formData.counterpartyBo2Occupation || '',
            idType:          formData.counterpartyBo2IdType || 'NRIC',
            idOthersDetail:  formData.counterpartyBo2IdOthersDetail || ''
        },

        // Form U4 — counterparty's principal entity (when counterparty acts on behalf of an entity)
        counterpartyPrincipalEntity: {
            name:                formData.counterpartyPrincipalEntityName || '',
            uen:                 formData.counterpartyPrincipalEntityUen || '',
            dateOfIncorp:        formData.counterpartyPrincipalEntityDateOfIncorp || '',
            country:             formData.counterpartyPrincipalEntityCountry || 'Singapore',
            registeredAddress:   formData.counterpartyPrincipalEntityAddress || '',
            principalAddress:    formData.counterpartyPrincipalEntityPrincipalAddress || '',
            phone:               formData.counterpartyPrincipalEntityPhone || '',
            email:               formData.counterpartyPrincipalEntityEmail || '',
            mainBusiness:        formData.counterpartyPrincipalEntityMainBusiness || '',
            type:                formData.counterpartyPrincipalEntityType || 'Company',
            typeOthersDetail:    formData.counterpartyPrincipalEntityTypeOthersDetail || '',
            authorised:          formData.counterpartyPrincipalEntityAuthorised !== false,
            p1Designation:       formData.counterpartyPrincipalEntityP1Designation || '',
            p1Name:              formData.counterpartyPrincipalEntityP1Name || '',
            p1Nric:              formData.counterpartyPrincipalEntityP1Nric || '',
            p1Nationality:       formData.counterpartyPrincipalEntityP1Nationality || '',
            p1IdType:            formData.counterpartyPrincipalEntityP1IdType || 'NRIC',
            p1IdOthersDetail:    formData.counterpartyPrincipalEntityP1IdOthersDetail || '',
            p2Designation:       formData.counterpartyPrincipalEntityP2Designation || '',
            p2Name:              formData.counterpartyPrincipalEntityP2Name || '',
            p2Nric:              formData.counterpartyPrincipalEntityP2Nric || '',
            p2Nationality:       formData.counterpartyPrincipalEntityP2Nationality || '',
            p2IdType:            formData.counterpartyPrincipalEntityP2IdType || 'NRIC',
            p2IdOthersDetail:    formData.counterpartyPrincipalEntityP2IdOthersDetail || '',
            p3Designation:       formData.counterpartyPrincipalEntityP3Designation || '',
            p3Name:              formData.counterpartyPrincipalEntityP3Name || '',
            p3Nric:              formData.counterpartyPrincipalEntityP3Nric || '',
            p3Nationality:       formData.counterpartyPrincipalEntityP3Nationality || '',
            p3IdType:            formData.counterpartyPrincipalEntityP3IdType || 'NRIC',
            p3IdOthersDetail:    formData.counterpartyPrincipalEntityP3IdOthersDetail || ''
        },
        counterpartyPrincipalBo1: {
            fullName:        formData.counterpartyPrincipalBo1Name || '',
            nricOrPassport:  formData.counterpartyPrincipalBo1Nric || '',
            dob:             formData.counterpartyPrincipalBo1Dob || '',
            address:         formData.counterpartyPrincipalBo1Address || '',
            nationality:     formData.counterpartyPrincipalBo1Nationality || '',
            occupation:      formData.counterpartyPrincipalBo1Occupation || '',
            idType:          formData.counterpartyPrincipalBo1IdType || 'NRIC',
            idOthersDetail:  formData.counterpartyPrincipalBo1IdOthersDetail || ''
        },
        counterpartyPrincipalBo2: {
            fullName:        formData.counterpartyPrincipalBo2Name || '',
            nricOrPassport:  formData.counterpartyPrincipalBo2Nric || '',
            dob:             formData.counterpartyPrincipalBo2Dob || '',
            address:         formData.counterpartyPrincipalBo2Address || '',
            nationality:     formData.counterpartyPrincipalBo2Nationality || '',
            occupation:      formData.counterpartyPrincipalBo2Occupation || '',
            idType:          formData.counterpartyPrincipalBo2IdType || 'NRIC',
            idOthersDetail:  formData.counterpartyPrincipalBo2IdOthersDetail || ''
        }
    };
};

// =====================================================
// Helper: safely look up a nested key like "client.fullName"
// =====================================================
window.amlGetValue = function(obj, dottedKey) {
    if (!obj || !dottedKey) return undefined;
    return dottedKey.split('.').reduce(function(acc, k) {
        return (acc && acc[k] !== undefined) ? acc[k] : undefined;
    }, obj);
};
