"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockContext = void 0;
const jest_mock_extended_1 = require("jest-mock-extended");
const createMockContext = () => {
    return {
        prisma: (0, jest_mock_extended_1.mockDeep)(),
    };
};
exports.createMockContext = createMockContext;
