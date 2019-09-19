
typeof console !== 'undefined' &&  san.debug && describe('warn', function () {
    beforeEach(function () {
        spyOn(console, 'warn');
    });

    it('reserved component method', function () {
        var MyComponent = san.defineComponent({
            template: '<div></div>',
            attach: function () {}
        });

        new MyComponent();
        expect(console.warn).toHaveBeenCalled();

        var msg = console.warn.calls.first().args[0];
        expect(msg).toContain('attach');
        expect(msg).toContain('[SAN WARNING]');
        expect(msg).toContain('reserved key');
    });

    it('event bind to not exists method', function () {
        var MyComponent = san.defineComponent({
            template: '<div on-click="nomethod"></div>'
        });

        var myComponent = new MyComponent();
        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        myComponent.attach(wrap);

        expect(console.warn).toHaveBeenCalled();

        var msg = console.warn.calls.first().args[0];
        expect(msg).toContain('not exist');
        expect(msg).toContain('[SAN WARNING]');
        expect(msg).toContain('nomethod');

        myComponent.dispose();
        document.body.removeChild(wrap);
    });

    it('set html', function () {
        var MyComponent = san.defineComponent({
            template: '<div><select s-html="selectText"></select></div>',
            initData: function () {
                return {
                    selectText: '<option>1</option>'
                };
            }
        });

        var myComponent = new MyComponent();
        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        myComponent.attach(wrap);

        expect(console.warn).toHaveBeenCalled();

        var msg = console.warn.calls.first().args[0];
        expect(msg).toContain('may cause an error in old IE');
        expect(msg).toContain('[SAN WARNING]');

        myComponent.dispose();
        document.body.removeChild(wrap);
    });


    it('component undefined template', function () {
        var MyComponent = san.defineComponent({
            initData: function () {
                return {
                    selectText: '<option>1</option>'
                };
            }
        });

        var myComponent = new MyComponent();
        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        myComponent.attach(wrap);

        expect(console.warn).toHaveBeenCalled();

        var msg = console.warn.calls.first().args[0];
        expect(msg).toContain('Component template must have a root element');
        expect(msg).toContain('[SAN WARNING]');

        myComponent.dispose();
        document.body.removeChild(wrap);
    });

    it('component allow just one root element', function () {

        var MyComponent = san.defineComponent({
            template: '<div></div><div></div>'
        });
        new MyComponent();

        expect(console.warn).toHaveBeenCalled();

        var msg = console.warn.calls.first().args[0];
        expect(msg).toContain('Component template must have a root element');
        expect(msg).toContain('[SAN WARNING]');
    });

    it('component template not allow text', function () {

        var MyComponent = san.defineComponent({
            template: 'hello san'
        });
        new MyComponent();

        expect(console.warn).toHaveBeenCalled();

        var msg = console.warn.calls.first().args[0];
        expect(msg).toContain('Component template must have a root element');
        expect(msg).toContain('[SAN WARNING]');

    });
});
