describe('main.js', function() {
	describe('calculate()', function() {
		beforeEach(function() {
			spyOn(window, 'updateResult');
		})
		it('validates expression when the first number is invalid', function() {
			calculate('a+3');
			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Operation not recognised');
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});

		it('validates expression when the second number is invalid', function() {
			calculate('2+f');
			expect(window.updateResult).toHaveBeenCalled();
		});

		it('validates expression when the operator is invalid', function() {
			calculate('2_3');
			expect(window.updateResult).toHaveBeenCalled();
		});
		
		it('calls add', function() {
			const spy = spyOn(Calculator.prototype, 'add');
			calculate('3+4');
			expect(spy).toHaveBeenCalledTimes(2);
			expect(spy).toHaveBeenCalledWith(3);
			expect(spy).toHaveBeenCalledWith(4);
		});

		it('calls substract', function() {
			const spy = spyOn(Calculator.prototype, 'subtract');
			calculate('3-7');
			expect(spy).toHaveBeenCalled();
			expect(spy).toHaveBeenCalledWith(7);
		});

		it('calls multiply', function() {
			const spy = spyOn(Calculator.prototype, 'multiply');

			calculate('44*3');
	
			expect(spy).toHaveBeenCalled();
			expect(spy).not.toHaveBeenCalledWith(44);
			expect(spy).toHaveBeenCalledWith(3);
		});

		it('calls divide', function() {
			const spy = spyOn(Calculator.prototype, 'divide');
			calculate('4/3');
			expect(spy).toHaveBeenCalled();
			expect(spy).not.toHaveBeenCalledWith(4);
			expect(spy).toHaveBeenCalledWith(3);

		});

		it('calls updateResult (example using and.callThrough', function() {
			spyOn(Calculator.prototype, 'multiply').and.callThrough();

			calculate('4*3');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith(12);

		});

		it('calls updateResult (example using and.callFake', function() {
			spyOn(Calculator.prototype, 'multiply').and.callFake(function(num) {
				return 'it works';
			});

			calculate('4*3');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('it works');

		});

		it('calls updateResult (example using and.returnValue', function() {
			spyOn(Calculator.prototype, 'multiply').and.returnValue('ramdom text');

			calculate('4*3');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('ramdom text');

		});

		it('calls updateResult (example using and.returnValues', function() {
			spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever returns');

			calculate('2+3');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('whatever returns');
		});

		it('does not handle errors', function(){
			spyOn(Calculator.prototype, 'multiply').and.throwError('some err message');

			expect(function() { calculate('5*5') }).toThrowError('some err message');
		});
	});
	
	describe('updateResult()', function() {
		let el;
		beforeAll(function() {
			el = document.createElement('div'); 
			el.setAttribute('id', 'result');
			this.el = el;
			document.body.appendChild(el);
		});

		afterAll(function() {
			document.body.removeChild(this.el);
		});

		it('adds result to DOM element', function() {
			updateResult('5')
			expect(this.el.innerText).toBe('5');
		});

	});

	describe('showVersion()', function() {
		it('calls calulator.version', function() {
			spyOn(document, 'getElementById').and.returnValue({
				innerText: ''
			})
			
			const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
				Promise.resolve()
			);
				
			showVersion();

			expect(spy).toHaveBeenCalled();

		})
	});
});