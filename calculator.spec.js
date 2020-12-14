describe('calculator.js', function() {
	describe('Calculator', function() {
		let calculator;
		let calculator2;
		beforeEach(function() {
			calculator = new Calculator();
			calculator2 = new Calculator();
		});

		afterEach(function() {
		});
		
		it('should initialize the total', () => {
			expect(calculator.total).toBe(0);
			expect(calculator.total).toBeFalsy();
		});

		it('has a constructor', () => {
			expect(calculator).toEqual(calculator2);
		});

		it('can be instantiated', () => {
			jasmine.addMatchers(customMatchers);

			expect(calculator).toBeCalculator();
			expect(2).not.toBeCalculator();
			expect(calculator).toBeTruthy();
			expect(calculator.constructor.name).toContain('Calculator');
		});
		
		it('instantiates unique object', () => {
			expect(calculator).not.toBe(calculator2);
		});

		it('has common operations', () => {
			
			expect(calculator.add).not.toBeUndefined();
		});

		it('can overwrite total', () => {
			calculator.total = null;

			expect(calculator.total).toBeNull();
		});
		
		describe('add()', function() {
			it('should add numbers to total', () => {
				calculator.add(5);
				expect(calculator.total).toBe(5);
			});

			it('returns a total', () => {
				calculator.total = 50;
	
				expect(calculator.add(20)).toBe(70);
				expect(calculator.subtract(70)).toMatch(/[+|-]?\d+/);
				expect(typeof calculator.total).toMatch('number');
				expect(calculator.total).toBeNumber();
				expect(calculator.total).toEqual(jasmine.anything());
				expect(function() {}).toEqual(jasmine.anything());
			});			
		});
	
		describe('subtract()', function() {
			it('should subtract numbers from total', () => {
				calculator.total = 30;
				calculator.subtract(5);
				expect(calculator.total).toBe(25);
			});
		});
		
		describe('divide()', function() {
			it('should divide total by number', () => {
				calculator.total = 15;
				calculator.divide(5);
				expect(calculator.total).toBe(3);
			});

			it('handles divides by zero', () => {
				calculator.total = 20;
				let callback = function() {
					calculator.divide(0);
				}

				expect(callback).toThrow();
				expect(callback).toThrowError(Error);
				expect(callback).toThrowError(Error, 'cannot divide by zero');
			});		
		});
		
		describe('get version', function() {
			it('fetches from external source (mocking)', async (done) => {
				spyOn(window, 'fetch').and.returnValue(Promise.resolve(
					new Response('{"version": "0.1"}')
				));
				let version = await calculator.version;

				done();

				expect(version).toBe('0.1');
			});

			it('fetches from external source and return result', (done) => {
				calculator.version.then(function(version) {
					expect(version).toBe('0.1');
					done();
				});
			});
		});

		describe('mulitply()', function() {
			it('should multiply total by number', () => {
				calculator.total = 100;
				calculator.multiply(2);
				expect(calculator.total).toBe(200);
			});
			
			it('does not handle NaN', () => {
				calculator.total = 20;
				calculator.multiply('a')

				expect(calculator.total).toBeNaN();
			});
		});

	});
});
